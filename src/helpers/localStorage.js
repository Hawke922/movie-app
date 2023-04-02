export const saveFavourites = (favourites) =>
  localStorage.setItem('favourites', JSON.stringify(favourites))

export const getFavourites = () =>
  JSON.parse(localStorage.getItem('favourites')) ?? []
