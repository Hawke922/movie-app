import React, { createContext, useState } from 'react'

const SearchContext = createContext([])

const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    searchValue: '',
    scrollPosition: 0,
  })

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContext, SearchProvider }
