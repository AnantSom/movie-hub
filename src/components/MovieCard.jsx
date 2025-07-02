import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movieObj, poster_path, name }) {
  const myContext = useContext(AppContext);
  const navigate = useNavigate();

  /**
   * Check if movie is already in watchlist
   * @param {Object} movieObj - Movie object to check
   * @returns {boolean} - True if movie is in watchlist
   */
  function doesContain(movieObj) {
    for (let i = 0; i < myContext.watchlist.length; i++) {
      if (myContext.watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  /**
   * Handle movie card click to navigate to details page
   * Prevents navigation when clicking watchlist buttons
   * @param {Event} e - Click event
   */
  const handleMovieClick = (e) => {
    if (e.target.closest('.watchlist-button')) {
      return;
    }
    navigate(`/movie/${movieObj.id}`);
  };

  return (
    <div
      className="group relative h-[35vh] w-[200px] bg-center bg-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden border border-gray-200"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
      onClick={handleMovieClick}
    >
      {/* Watchlist Button */}
      <div className="absolute top-3 right-3 z-10">
        {doesContain(movieObj) ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              myContext.handleRemoveFromWatchlist(movieObj);
            }}
            className="watchlist-button flex justify-center items-center h-10 w-10 rounded-full bg-red-500/90 hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
            title="Remove from Watchlist"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              myContext.handleAddtoWatchlist(movieObj);
            }}
            className="watchlist-button flex justify-center items-center h-10 w-10 rounded-full bg-pink-500/90 hover:bg-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
            title="Add to Watchlist"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Movie Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <h3 className="text-white text-lg font-semibold text-center leading-tight group-hover:text-yellow-300 transition-colors duration-300">
          {name}
        </h3>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm font-medium">Click to view details</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;