import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import { getFavourites } from '/src/helpers/localStorage'

import classes from './Navbar.module.scss'

const Navbar = () => {
  const [favourites, setFavourites] = useState(getFavourites())

  useEffect(() => {
    window.addEventListener('storage', handleStorageUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageUpdate)
    }
  }, [])

  const handleStorageUpdate = () => {
    // need to wait a bit to make sure the favourites are updated
    setTimeout(() => {
      setFavourites(getFavourites())
    }, 100)
  }

  const getClassName = ({ isActive }) =>
    isActive ? classnames(classes.link, classes['link--active']) : classes.link

  return (
    <nav className={classes.wrapper}>
      <div className={classes['inner-wrapper']}>
        <NavLink to='/' className={getClassName}>
          Search
        </NavLink>
        <h1 className={classes.logo}>
          <span className={classes['highlighted-font']}>MOVIE</span>APP
        </h1>
        <NavLink to='/favourites' className={getClassName}>
          Favourites {`(${favourites.length})`}
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
