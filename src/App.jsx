import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './routes/Home'
import MovieDetail from './routes/MovieDetail'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favourites' element={<div>Favourites</div>} />
          <Route path='/detail/:idMovie' element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
