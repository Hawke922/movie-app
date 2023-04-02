// create favourites component
import React, { useContext } from 'react'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { FavouritesContext } from '/src/context/FavouritesContext'

import classes from './Favourites.module.scss'

const Favourites = () => {
  const { favourites, setFavourites } = useContext(FavouritesContext)
  const navigate = useNavigate()

  if (favourites.length === 0) {
    return (
      <div className={classnames(classes.wrapper, classes['wrapper--empty'])}>
        Search for movies and mark them as favourite to add to the library.
      </div>
    )
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
              onClick={() => {
                setFavourites((prevFavourites) =>
                  prevFavourites.filter((movieToFilter) => movieToFilter.id !== movie.id)
                )
              }}
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
