// src/App.jsx
import React from 'react'
import Navbar from './components/Navbar'
import MainRoutes from './routes/MainRoutes'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const App = ({ onCartClick }) => {
  return (
    <div>
      <ScrollToTop/>
      <Navbar onCartClick={onCartClick} />
      <MainRoutes onAddToCartSuccess={onCartClick} />
      <Footer />
    </div>
  )
}

export default App