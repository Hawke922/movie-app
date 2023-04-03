import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useInfiniteQuery } from '@tanstack/react-query'

import Loader from '/src/components/Loader'

import Movie from './components/Movie'

import classes from './MovieList.module.scss'

const MovieList = ({ searchValue }) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY

  const { fetchNextPage, hasNextPage, isFetching, error, data } =
    useInfiniteQuery({
      queryKey: ['movies', searchValue],
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}&type=movie&page=${pageParam}`
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

  if (isFetching && data === undefined) {
    return <Loader />
  }

  if (error) {
    return <span>{error}</span>
  }

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
      {hasNextPage && isFetching && <Loader />}
    </div>
  )
}

MovieList.propTypes = {
  searchValue: PropTypes.string.isRequired,
}

export default MovieList
