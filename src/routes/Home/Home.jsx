import React, { useState, useCallback, useRef } from 'react'
import classnames from 'classnames'
import { useInfiniteQuery } from '@tanstack/react-query'

import { useDebounce } from '/src/helpers/hooks.js'

import classes from './Home.module.scss'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 500)

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
    queryKey: ['movies', debouncedSearchValue],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${debouncedSearchValue}&type=movie&page=${pageParam}`
      )

      return await res.json()
    },
    enabled: debouncedSearchValue !== '',
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

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

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

  const renderMovies = () => {
    if (debouncedSearchValue === '') {
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
      <ul className={classes['movie-list']}>
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <li
                key={movie.imdbID}
                className={classes['movie-list__movie']}
                ref={lastMovieRef}
              >
                {movie.Title}
              </li>
            )
          }

          return (
            <li key={movie.imdbID} className={classes['movie-list__movie']}>
              {movie.Title}
            </li>
          )
        })}
        <div
          className={classnames(classes['movie-list__loader'], {
            [classes['movie-list__loader--hidden']]: hasNextPage === false,
          })}
        />
      </ul>
    )
  }

  return (
    <div className={classes.wrapper}>
      <input
        className={classes.input}
        type='text'
        placeholder='Search for a movie'
        value={searchValue}
        onChange={handleChange}
      />
      {renderMovies()}
    </div>
  )
}

export default Home
