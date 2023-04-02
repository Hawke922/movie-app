import React, { useState } from 'react'

import { useDebounce } from '/src/helpers/hooks.js'

import MovieList from './components/MovieList'

import classes from './Home.module.scss'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const handleChange = (event) => {
    setSearchValue(event.target.value)
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
      <MovieList searchValue={debouncedSearchValue} />
    </div>
  )
}

export default Home
