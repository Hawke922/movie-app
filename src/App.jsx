import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { FavouritesProvider } from './context/FavouritesContext'
import { SearchProvider } from './context/SearchContext'

import Navbar from './components/Navbar'
import Loader from './components/Loader'

const Home = lazy(() => import('./routes/Home'))
const MovieDetail = lazy(() => import('./routes/MovieDetail'))
const Favourites = lazy(() => import('./routes/Favourites'))

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <FavouritesProvider>
        <SearchProvider>
          <BrowserRouter>
            <Navbar />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/favourites' element={<Favourites />} />
                <Route path='/detail/:idMovie' element={<MovieDetail />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SearchProvider>
      </FavouritesProvider>
    </QueryClientProvider>
  )
}

export default App
