import React, { useContext, useEffect, useState } from "react";
import genreids from '../Utility/Genre'
import { AppContext } from "../context/AppContext";

/**
 * WatchList Component
 * 
 * Purpose: Display and manage user's watchlist of movies
 * Features:
 * - Filter movies by genre with dynamic genre list
 * - Search functionality to find specific movies
 * - Sort movies by rating (ascending/descending)
 * - Display movies in a responsive table format
 * - Remove movies from watchlist
 * - Show movie posters, ratings, popularity, and genre
 * - Empty state when no movies in watchlist
 */
function WatchList() {
  const { watchlist, setWatchList, handleRemoveFromWatchlist } = useContext(AppContext)
  
  const [search, setSearch] = useState("")
  const [genreList, setGenreList] = useState(['All Genres'])
  const [currGenre, setCurrGenre] = useState('All Genres')

  /**
   * Handle search input changes
   * @param {Event} e - Input change event
   */
  let handleSearch = (e) => {
    setSearch(e.target.value)
  }

  /**
   * Handle genre filter selection
   * @param {string} genre - Selected genre to filter by
   */
  let handleFilter = (genre) => {
    setCurrGenre(genre)
  }

  /**
   * Sort watchlist by rating in ascending order
   */
  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average
    })
    setWatchList([...sortedIncreasing])
  }

  /**
   * Sort watchlist by rating in descending order
   */
  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average
    })
    setWatchList([...sortedDecreasing])
  }

  /**
   * Generate dynamic genre list based on movies in watchlist
   */
  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids && movieObj.genre_ids[0] ? movieObj.genre_ids[0] : 'Unknown']
    })
    temp = new Set(temp)
    setGenreList(['All Genres', ...temp])
  }, [watchlist])

  // Empty watchlist state
  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🍿</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Watchlist is Empty</h2>
          <p className="text-gray-600 text-lg mb-8">
            Start adding movies to your watchlist to keep track of what you want to watch!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              💡 Tip: Click the heart icon on any movie card to add it to your watchlist
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            My Watchlist
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your favorite movies and keep track of what to watch next
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Genre Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Filter by Genre</h3>
          <div className="flex justify-center flex-wrap gap-3">
            {genreList.map((genre, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleFilter(genre)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currGenre === genre
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-50'
                  }`}
                >
                  {genre}
                </button>
              )
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <div className="relative max-w-md w-full">
            <input
              onChange={handleSearch}
              value={search}
              type="text"
              placeholder="Search your movies..."
              className="w-full h-12 bg-white rounded-full px-6 pr-12 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-xl transition-all duration-300 text-gray-700"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Movies Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Movie
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={sortIncreasing}
                        className="p-1 rounded hover:bg-gray-200 transition-colors duration-200"
                        title="Sort Ascending"
                      >
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <span>Rating</span>
                      <button 
                        onClick={sortDecreasing}
                        className="p-1 rounded hover:bg-gray-200 transition-colors duration-200"
                        title="Sort Descending"
                      >
                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Popularity
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {watchlist
                  .filter((movieObj) => {
                    if (currGenre === 'All Genres') {
                      return true
                    } else {
                      return genreids[movieObj.genre_ids && movieObj.genre_ids[0] ? movieObj.genre_ids[0] : 'Unknown'] === currGenre
                    }
                  })
                  .filter((movieObj) => {
                    return movieObj.title
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  })
                  .map((movieObj) => {
                    return (
                      <tr key={movieObj.id} className="hover:bg-gray-50 transition-colors duration-200">
                        
                        {/* Movie Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="h-20 w-14 object-cover rounded-lg shadow-md"
                                src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                                alt={movieObj.title}
                              />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                {movieObj.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {movieObj.release_date ? new Date(movieObj.release_date).getFullYear() : 'N/A'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Rating */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-lg font-semibold text-gray-900">
                              {movieObj.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </td>

                        {/* Popularity */}
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {Math.round(movieObj.popularity)}
                          </span>
                        </td>

                        {/* Genre */}
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            {genreids[movieObj.genre_ids && movieObj.genre_ids[0] ? movieObj.genre_ids[0] : 'Unknown']}
                          </span>
                        </td>

                        {/* Remove Button */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleRemoveFromWatchlist(movieObj)}
                            className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                            title="Remove from Watchlist"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3l3-3a1 1 0 111.414 1.414L12.414 10l3 3a1 1 0 01-1.414 1.414L11 11.414l-3 3a1 1 0 01-1.414-1.414L9.586 10l-3-3a1 1 0 111.414-1.414L11 9V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Remove
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{watchlist.length}</div>
              <div className="text-sm text-gray-600">Total Movies</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{genreList.length - 1}</div>
              <div className="text-sm text-gray-600">Genres</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchList