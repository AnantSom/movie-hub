import React, { useEffect, useState } from 'react'
import axios from 'axios' // Make sure axios is installed
import MovieCard from './MovieCard' // Assuming this path is correct
import Pagination from './Pagination' // Assuming this path is correct

function Movies() {
    // State variables to manage movies data, pagination, loading status, and errors
    const [movies, setMovies] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // TODO: Add your TMDb API key here
    const handlePrev = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1)
        }
    }
    const handleNext = () => {
        setPageNo(pageNo + 1)
    }
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true) // Set loading to true before fetching
                setError(null) // Clear any previous errors

                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`
                )

                setMovies(response.data.results) // Update movies state with fetched data
                setLoading(false) // Set loading to false after successful fetch
            } catch (err) { // Catch any errors during the API call
                setLoading(false) // Ensure loading state is reset even on error
                setError('Oops! Something went wrong. Unable to fetch movies at this time.');
            }
        }
        if (API_KEY) {
            fetchMovies();
        } else {
            // If API_KEY is missing, display a generic error and stop loading
            setError('Oops! Movies cannot be loaded at this time. Please try again later.');
            setLoading(false);
        }
    }, [API_KEY, pageNo]); // Dependency array: Re-run effect if API_KEY or pageNo changes
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

    // Display error message if an error occurred during fetching
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
                    {/* The `error` state variable is displayed here, which will now contain the generic message */}
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    // --- Main component rendering when not loading and no errors ---
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
                    {/* Map through the movies array and render a MovieCard for each movie */}
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

            {/* Pagination controls */}
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