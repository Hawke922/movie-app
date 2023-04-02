import React, { createContext, useState } from 'react'

const FavouritesContext = createContext([])

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([])

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export { FavouritesContext, FavouritesProvider }
