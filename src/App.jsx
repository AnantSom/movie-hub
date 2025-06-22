import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
// CHANGE 1: Added import for the new MovieDetails component
import MovieDetails from "./components/MovieDetails";

import { AppContext } from "./context/AppContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });

    setWatchList(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
    console.log(filteredWatchlist);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <>
     <AppContext.Provider value={{watchlist , handleAddtoWatchlist , handleRemoveFromWatchlist , setWatchList}}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* CHANGE 2: Removed extra space in JSX comment */}
                <Banner />
                <Movies/>
              </>
            }
          />

          <Route
            path="/watchlist"
            element={
              <WatchList/>
            }
          />

          {/* CHANGE 3: Added new route for movie details page */}
          {/* This route accepts a movie ID parameter and renders the MovieDetails component */}
          <Route
            path="/movie/:id"
            element={
              <MovieDetails/>
            }
          />
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;