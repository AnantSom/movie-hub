import React, { useEffect, useState } from 'react'
import axios from 'axios' // Make sure axios is installed
import MovieCard from './MovieCard' // Assuming this path is correct
import Pagination from './Pagination' // Assuming this path is correct

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

    // API key for TMDb - This is how Vite exposes environment variables.
    // VITE_TMDB_API_KEY comes from your .env file, passed via docker-compose build args,
    // and correctly set as an ENV var in your Dockerfile during the build process.
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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
     * Fetch movies from TMDb API when page number changes or API_KEY state changes
     */
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                setError(null) // Clear any previous errors

                // DEBUGGING: Optional - you can log the API_KEY here for your *own* console debugging,
                // but remember to remove or comment it out before deploying to production if you
                // are concerned about it even appearing in client-side console logs.
                // console.log("DEBUG: Attempting TMDB API request with key:", API_KEY ? "Defined" : "Undefined/Null");

                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`
                )

                setMovies(response.data.results)
                setLoading(false)
            } catch (err) { // 'err' is the error object provided by axios
                setLoading(false) // Ensure loading state is reset even on error

                // --- START OF DETAILED DEBUGGING LOGGING (ONLY TO BROWSER CONSOLE) ---
                console.error("API Call Error: Full error object:", err);

                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx (e.g., 401, 403, 404, 500)
                    console.error("API Error Response Status:", err.response.status);
                    // This is where TMDB's specific error message like "Invalid API key" usually resides
                    console.error("API Error Response Data:", err.response.data);
                    console.error("API Error Response Headers:", err.response.headers);
                } else if (err.request) {
                    // The request was made but no response was received
                    // `err.request` is an instance of XMLHttpRequest in the browser, or http.ClientRequest in node.js
                    console.error("Network Error: No response received from server. Request object:", err.request);
                } else {
                    // Something else happened in setting up the request that triggered an Error
                    console.error("Request Setup Error:", err.message);
                }
                console.error("Error Stack Trace:", err.stack);
                // --- END OF DETAILED DEBUGGING LOGGING ---


                // --- USER-FACING ERROR MESSAGE (GENERIC, NO SENSITIVE INFO) ---
                // This message will be displayed on the webpage for the user
                setError('Oops! Something went wrong. Unable to fetch movies at this time.');
                // You could offer a slightly more specific but still generic message based on error type:
                // if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                //     setError('Authentication failed for movie service. Please try again later.');
                // } else if (err.request) {
                //     setError('Could not connect to movie service. Please check your internet connection.');
                // } else {
                //     setError('An unexpected error occurred while fetching movies.');
                // }
                // --- END USER-FACING ERROR MESSAGE ---
            }
        }

        // This check ensures we only try to fetch if an API key is actually present.
        // The console.warn will appear in your browser's dev console if the key is missing.
        if (API_KEY) {
            fetchMovies();
        } else {
            console.warn("DEVELOPER WARNING: TMDB API_KEY is not defined. Skipping movie fetch.");
            // Set a generic error message for the user on the page
            setError('Oops! Movies cannot be loaded at this time. Please try again later.');
            setLoading(false);
        }
    }, [API_KEY, pageNo]); // Dependency array: Re-run effect if API_KEY or pageNo changes

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
                    {/* The `error` state variable is displayed here, which will now contain the generic message */}
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