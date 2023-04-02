import React, { useState } from 'react'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { getFavourites, saveFavourites } from '/src/helpers/localStorage'

import classes from './Favourites.module.scss'

const Favourites = () => {
  const navigate = useNavigate()

  // this is a hacky approach, but since we wanted to persist favourites in local storage, sacrifaces needed to be made :D 
  const [storageUpdated, setStorageUpdated] = useState(false)

  const favourites = getFavourites()

  if (favourites.length === 0) {
    return (
      <div className={classnames(classes.wrapper, classes['wrapper--empty'])}>
        Search for movies and mark them as favourite to add to the library.
      </div>
    )
  }

  const handleRemove = (idToRemove) => {
    setStorageUpdated((prevState) => !prevState)
    // seems like dispatch event wont be fired automatically in the same document
    window.dispatchEvent(new Event('storage'))

    saveFavourites(favourites.filter((movie) => movie.id !== idToRemove))
  }

  return (
    <div className={classes.wrapper}>
      {favourites.map((movie) => (
        <div className={classes.movie} key={movie.id}>
          <img
            className={classes['movie__poster']}
            src={movie.poster}
            alt={movie.title}
            onClick={() => navigate(`/detail/${movie.id}`)}
          />
          <h3 className={classes['movie__title']} title={movie.title}>
            {movie.title}
          </h3>
          <div className={classes['movie__subheadline']}>
            <span className={classes['movie__year']}>{movie.year}</span>
            <button
              className={classes['movie__remove-button']}
              onClick={() => handleRemove(movie.id)}
            >
              REMOVE
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Favourites
