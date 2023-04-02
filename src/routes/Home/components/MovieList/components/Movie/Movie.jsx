import React, { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import classes from './Movie.module.scss'

const Movie = forwardRef(({ title, id }, ref) => {
  const navigate = useNavigate()

  return (
    <div
      className={classes.wrapper}
      ref={ref}
      onClick={() => navigate(`/detail/${id}`)}
    >
      {title}
    </div>
  )
})

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Movie
