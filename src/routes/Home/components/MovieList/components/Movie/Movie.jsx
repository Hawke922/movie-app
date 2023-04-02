import React, { forwardRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { FavouritesContext } from '/src/context/FavouritesContext'

import classes from './Movie.module.scss'

const Movie = forwardRef(({ title, id }, ref) => {
  const navigate = useNavigate()
  const { favourites } = useContext(FavouritesContext)

  const isFavourite = favourites.some((movie) => movie.id === id)

  return (
    <div
      className={classes.wrapper}
      ref={ref}
      onClick={() => navigate(`/detail/${id}`)}
    >
      <span>{title}</span>
      {isFavourite && <span className={classes.highlight}>Favourite</span>}
    </div>
  )
})

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Movie
