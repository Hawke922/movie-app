import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'

import { FavouritesContext } from '/src/context/FavouritesContext'

import { ReactComponent as StarIcon } from '/src/assets/star.svg'

import Loader from '/src/components/Loader'

import classes from './MovieDetail.module.scss'

const MovieDetail = () => {
  const { idMovie } = useParams()
  const { favourites, setFavourites } = useContext(FavouritesContext)

  const apiKey = import.meta.env.VITE_OMDB_API_KEY

  const { data, isLoading, error } = useQuery({
    queryKey: ['movie', idMovie],
    queryFn: async () => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${idMovie}&plot=full`
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

  const isFavourite = favourites.some((movie) => movie.id === data.imdbID)

  const handleFavourite = () => {
    if (isFavourite) {
      setFavourites(favourites.filter((movie) => movie.id !== data.imdbID))

      return
    }

    setFavourites([
      ...favourites,
      {
        id: data.imdbID,
        poster: data.Poster,
        title: data.Title,
        year: data.Year,
      },
    ])
  }

  console.log(data)

  const hasPoster = data.Poster !== 'N/A'

  return (
    <div className={classes.wrapper}>
      {hasPoster && (
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
