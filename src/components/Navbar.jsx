import React from 'react'
import Logo from '../logo.jpg'
import { Link, useLocation } from 'react-router-dom'

/**
 * Navbar Component
 * 
 * Purpose: Navigation bar for the movie application
 * Features:
 * - Logo that navigates to home page when clicked
 * - Navigation links for Movies and Watchlist pages
 * - Active state highlighting for current page
 * - Responsive design with mobile-friendly layout
 * - Gradient text effects and hover animations
 * - Modern glassmorphism design
 */
const Navbar = () => {
  const location = useLocation()

  /**
   * Check if current path matches the given path
   * Used for highlighting active navigation links
   * @param {string} path - Path to check against current location
   * @returns {boolean} - True if paths match
   */
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          
          {/* Logo Section - Clickable to navigate home */}
          <Link 
            to='/' 
            className='flex items-center space-x-3 group transition-transform duration-300 hover:scale-105'
            title="Go to Home"
          >
            <div className='relative'>
              <img 
                className='w-14 h-14 rounded-full shadow-lg ring-2 ring-white group-hover:ring-blue-300 transition-all duration-300' 
                src={Logo} 
                alt="Movie App Logo" 
              />
              <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
            <div className='hidden sm:block'>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                CineHub
              </h1>
              <p className='text-xs text-gray-500 -mt-1'>Your Movie Universe</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className='flex items-center space-x-1 sm:space-x-4'>
            
            {/* Movies Link */}
            <Link 
              to='/' 
              className={`relative px-4 py-2 rounded-full font-semibold text-lg transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className='relative z-10'>Movies</span>
              {isActive('/') && (
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-75'></div>
              )}
            </Link>

            {/* Watchlist Link */}
            <Link 
              to='/watchlist' 
              className={`relative px-4 py-2 rounded-full font-semibold text-lg transition-all duration-300 ${
                isActive('/watchlist') 
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <span className='relative z-10 flex items-center space-x-2'>
                <span>Watchlist</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </span>
              {isActive('/watchlist') && (
                <div className='absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse opacity-75'></div>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50'></div>
    </nav>
  )
}

export default Navbar