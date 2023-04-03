import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'

import { getFavourites, saveFavourites } from '/src/helpers/localStorage'

import { ReactComponent as StarIcon } from '/src/assets/star.svg'

import Loader from '/src/components/Loader'

import classes from './MovieDetail.module.scss'

const MovieDetail = () => {
  const [storageUpdated, setStorageUpdated] = useState(false)
  const { idMovie } = useParams()

  const apiKey = import.meta.env.VITE_OMDB_API_KEY

  const { data, isLoading, error } = useQuery({
    queryKey: ['movie', idMovie],
    queryFn: async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${idMovie}&plot=full`
      )

      return await res.json()
    },
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div className={classes.error}>{error}</div>
  }

  if (data.Error) {
    return <div className={classes.error}>{data.Error}</div>
  }

  const favourites = getFavourites()

  const isFavourite = favourites.some((movie) => movie.id === data.imdbID)

  const handleFavourite = () => {
    setStorageUpdated((prevState) => !prevState)
    window.dispatchEvent(new Event('storage'))

    if (isFavourite) {
      saveFavourites(favourites.filter((movie) => movie.id !== data.imdbID))
      return
    }

    saveFavourites([
      ...favourites,
      {
        id: data.imdbID,
        poster: data.Poster,
        title: data.Title,
        year: data.Year,
      },
    ])
  }

  return (
    <div className={classes.wrapper}>
      {data.Poster !== 'N/A' && (
        <img className={classes.poster} src={data.Poster} alt={data.Title} />
      )}
      <div>
        <h2 className={classes.title}>{data.Title}</h2>
        <StarIcon
          className={classnames(classes['star-icon'], {
            [classes['star-icon--active']]: isFavourite,
          })}
          onClick={handleFavourite}
        />
        <div className={classes['info-line']}>
          <span className={classes.bold}>{data.Released}</span>
          &nbsp;&bull;&nbsp;
          <span>{data.Runtime}</span>
        </div>
        <p className={classes.plot}>
          <span className={classes.bold}>Plot:</span>
          <br />
          {data.Plot}
        </p>
        <div className={classes['info-table']}>
          <div className={classes.bold}>CAST:</div>
          <div>{data.Actors}</div>
          <div className={classes.bold}>DIRECTOR:</div>
          <div>{data.Director}</div>
          <div className={classes.bold}>GENRE:</div>
          <div>{data.Genre}</div>
          <div className={classes.bold}>ORIGIN:</div>
          <div>{data.Country}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
