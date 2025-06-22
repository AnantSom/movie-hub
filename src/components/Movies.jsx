import React from 'react'
import MovieCard from './MovieCard'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Pagination from './Pagination'

/**
 * Movies Component
 * 
 * Purpose: Main movies page displaying popular movies with pagination
 * Features:
 * - Fetches popular movies from TMDb API
 * - Displays movies in responsive grid layout
 * - Pagination for browsing through multiple pages
 * - Loading states and error handling
 * - Responsive design for different screen sizes
 */
function Movies() {
    const [movies, setMovies] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // API key for TMDb - Replace with your actual API key
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // TODO: Add your TMDb API key here

    /**
     * Navigate to previous page
     * Prevents going below page 1
     */
    const handlePrev = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1)
        }
    }

    /**
     * Navigate to next page
     */
    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    /**
     * Fetch movies from TMDb API when page number changes
     */
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                setError(null)
                
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`
                )
                
                setMovies(response.data.results)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch movies. Please check your API key.')
                setLoading(false)
            }
        }

        fetchMovies()
    }, [pageNo])

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                    <p className="text-lg text-gray-600">Loading movies...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            {/* Header Section */}
            <div className='text-center mb-10'>
                <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4'>
                    Trending Movies
                </h1>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                    Discover the most popular movies right now. Click on any movie to see more details!
                </p>
                <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full'></div>
            </div>

            {/* Movies Grid */}
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center'>
                    {movies.map((movieObj) => {
                        return (
                            <MovieCard 
                                key={movieObj.id} 
                                movieObj={movieObj} 
                                poster_path={movieObj.poster_path} 
                                name={movieObj.title} 
                            />
                        )
                    })}
                </div>
            </div>

            {/* Pagination */}
            <div className='mt-12'>
                <Pagination 
                    pageNo={pageNo} 
                    handleNext={handleNext} 
                    handlePrev={handlePrev}  
                />
            </div>
        </div>
    )
}

export default Movies
/*https://api.themoviedb.org/3/movie/popular?api_key=dbcd474517a3655d12d0b33ade3ca0f7&language=en-US&page=${pageNo}*/