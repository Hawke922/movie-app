import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'

import { useDebounce } from '/src/helpers/hooks.js'
import { SearchContext } from '/src/context/SearchContext'

import MovieList from './components/MovieList'

import classes from './Home.module.scss'

const Home = () => {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false)
  const { searchData, setSearchData } = useContext(SearchContext)

  const debouncedSearchValue = useDebounce(searchData.searchValue, 500)

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll button when user scrolls down
      if (window.pageYOffset > 0) {
        setIsScrollButtonVisible(true)
      } else {
        setIsScrollButtonVisible(false)
      }

      // Save scroll position to context
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
      <button
        className={classNames(classes['scroll-button'], {
          [classes['scroll-button--visible']]: isScrollButtonVisible,
        })}
        onClick={() => {
          if (isScrollButtonVisible === false) {
            return
          }

          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        Back to top
      </button>
    </div>
  )
}

export default Home
