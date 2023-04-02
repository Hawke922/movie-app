import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useInfiniteQuery } from '@tanstack/react-query'

import Movie from './components/Movie'

import classes from './MovieList.module.scss'

const MovieList = ({ searchValue }) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
    error,
    data,
    status,
  } = useInfiniteQuery({
    queryKey: ['movies', searchValue],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}&type=movie&page=${pageParam}`
      )

      return await res.json()
    },
    enabled: searchValue !== '',
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.Response === 'False') {
        return undefined
      }

      const lengthOfLoadedMovies = pages.reduce((acc, page) => {
        return acc + page.Search.length
      }, 0)

      const areAllMoviesLoaded =
        lengthOfLoadedMovies === Number(lastPage.totalResults)

      return areAllMoviesLoaded ? undefined : pages.length + 1
    },
  })

  const observer = useRef()

  const lastMovieRef = useCallback(
    (node) => {
      if (isFetching) {
        return
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (node) {
        observer.current.observe(node)
      }
    },
    [isFetching, hasNextPage]
  )

  if (searchValue === '') {
    return <div>Search for a movie</div>
  }

  if (status === 'pending' || data === undefined) {
    return <div className={classes['movie-list__loader']} />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  // TODO: constants for response types
  if (data.pages[0].Response === 'False') {
    return <div>No movies found</div>
  }

  const movies = data.pages.reduce((acc, page) => {
    return [...acc, ...page.Search]
  }, [])

  return (
    <div className={classes.wrapper}>
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <Movie
              key={movie.imdbID}
              title={movie.Title}
              id={movie.imdbID}
              ref={lastMovieRef}
            />
          )
        }

        return (
          <Movie key={movie.imdbID} title={movie.Title} id={movie.imdbID} />
        )
      })}
      <div
        className={classnames(classes.loader, {
          [classes['loader--hidden']]: hasNextPage === false,
        })}
      />
    </div>
  )
}

MovieList.propTypes = {
  searchValue: PropTypes.string.isRequired,
}

export default MovieList
