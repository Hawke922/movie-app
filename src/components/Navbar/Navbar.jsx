import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import { FavouritesContext } from '/src/context/FavouritesContext'

import classes from './Navbar.module.scss'

const Navbar = () => {
  const { favourites } = useContext(FavouritesContext)

  const getClassName = ({ isActive }) =>
    isActive ? classnames(classes.link, classes['link--active']) : classes.link

  return (
    <nav className={classes.wrapper}>
      <div className={classes['inner-wrapper']}>
        <NavLink to='/' className={getClassName}>
          Search
        </NavLink>
        <h1>
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
