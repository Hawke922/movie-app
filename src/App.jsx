import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
        <SearchProvider>
          <BrowserRouter>
            <Navbar />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/favourites' element={<Favourites />} />
                <Route path='/detail/:idMovie' element={<MovieDetail />} />
                <Route path='*' element={<h3 className='not-found-error'>404 Page Not Found</h3>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SearchProvider>
    </QueryClientProvider>
  )
}

export default App
