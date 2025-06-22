import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState('');
  const [trailerKey, setTrailerKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual API key
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch movie details
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        
        // Fetch movie credits (cast and crew)
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        
        // Fetch movie videos (trailers)
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        
        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 3)); // Get top 3 cast members
        
        // Find director from crew
        const directorInfo = creditsResponse.data.crew.find(person => person.job === 'Director');
        setDirector(directorInfo ? directorInfo.name : 'Director not available');
        
        // Find official trailer
        const trailer = videosResponse.data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube' && video.official === true
        ) || videosResponse.data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailerKey(trailer ? trailer.key : '');
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Movie Title */}
        <h1 className="text-3xl font-bold mb-6 text-center">{movie.title}</h1>

        {/* Rating */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
            <span className="text-2xl">⭐</span>
            <span className="text-xl font-semibold">{movie.vote_average.toFixed(1)}/10</span>
            <span className="text-gray-600">({movie.vote_count.toLocaleString()} votes)</span>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            {movie.overview || "No overview available for this movie."}
          </p>
        </div>

        {/* Director */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Director</h2>
          <p className="text-gray-700">{director}</p>
        </div>

        {/* Official Trailer */}
        {trailerKey && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Official Trailer</h2>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Main Cast</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center p-4 border rounded-lg">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-24 h-32 object-cover rounded mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-24 h-32 bg-gray-300 rounded mx-auto mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                  <h3 className="font-semibold">{actor.name}</h3>
                  <p className="text-sm text-gray-600">as {actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;