import React, { useContext, useEffect } from 'react'

import { useDebounce } from '/src/helpers/hooks.js'

import { SearchContext } from '/src/context/SearchContext'

import MovieList from './components/MovieList'

import classes from './Home.module.scss'

const Home = () => {
  const { searchData, setSearchData } = useContext(SearchContext)

  const debouncedSearchValue = useDebounce(searchData.searchValue, 500)

  useEffect(() => {
    const handleScroll = () => {
      setSearchData((previousSearchData) => ({
        ...previousSearchData,
        scrollPosition: window.scrollY,
      }))
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, searchData.scrollPosition)
  }, [])

  const handleChange = (event) => {
    setSearchData((previousSearchData) => ({
      ...previousSearchData,
      searchValue: event.target.value,
    }))
  }

  return (
    <div className={classes.wrapper}>
      <input
        className={classes.input}
        type='text'
        placeholder='Search for a movie'
        value={searchData.searchValue}
        onChange={handleChange}
      />
      <MovieList searchValue={debouncedSearchValue} />
    </div>
  )
}

export default Home
