import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { FavouritesProvider } from './context/FavouritesContext'
import { SearchProvider } from './context/SearchContext'

import Home from './routes/Home'
import MovieDetail from './routes/MovieDetail'
import Favourites from './routes/Favourites'
import Navbar from './components/Navbar'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <FavouritesProvider>
        <SearchProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favourites' element={<Favourites />} />
              <Route path='/detail/:idMovie' element={<MovieDetail />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </FavouritesProvider>
    </QueryClientProvider>
  )
}

export default App
