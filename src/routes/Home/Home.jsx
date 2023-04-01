import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useDebounce } from '/src/helpers/hooks.js'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')

  const apiKey = import.meta.env.VITE_OMDB_API_KEY

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const { isLoading, isError, isPaused, error, data } = useQuery({
    queryKey: ['movies', debouncedSearchValue],
    queryFn: () => {
      return fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${debouncedSearchValue}&type=movie`
      ).then((res) => res.json())
    },
    enabled: debouncedSearchValue !== '',
  })

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  console.log(isPaused)

  const renderMovies = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error: {error.message}</div>
    }
    console.log(data)

    return (
      <ul>
        {data.Search.map((movie) => (
          <li key={movie.imdbID}>{movie.Title}</li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Search a movie'
        value={searchValue}
        onChange={handleChange}
      />
      {renderMovies()}
    </div>
  )
}

export default Home
