import React, { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getFavourites } from '/src/helpers/localStorage'

import classes from './Movie.module.scss'

const Movie = forwardRef(({ title, id }, ref) => {
  const navigate = useNavigate()
  const favourites = getFavourites()

  const isFavourite = favourites.some((movie) => movie.id === id)

  return (
    <div
      className={classes.wrapper}
      ref={ref}
      onClick={() => navigate(`/detail/${id}`)}
    >
      <span className={classes.title}>{title}</span>
      {isFavourite && <span className={classes.highlight}>Favourite</span>}
    </div>
  )
})

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Movie
