# Movie Vault 🎬

A responsive web application for discovering popular movies, managing a personal watchlist, and viewing detailed movie information, built with React and containerized with Docker.


## ✨ Key Features

-   **Browse Trending Movies**: Fetches and displays the latest popular movies from The Movie Database (TMDb) API.
-   **Pagination**: Easily navigate through multiple pages of movie results.
-   **Personal Watchlist**: Add movies to a personal watchlist or remove them.
-   **Persistent Data**: The watchlist is saved to the browser's `localStorage`, so it persists between sessions.
-   **Filter & Sort**: The watchlist can be filtered by genre and sorted by rating.
-   **Detailed Views**: Click on any movie to see a dedicated details page with its overview, rating, cast, and embedded trailer.
-   **Dockerized**: Comes with a complete Docker setup for easy production deployment using Nginx.

## 🛠️ Tech Stack

-   **Frontend**: React.js, Vite
-   **Styling**: Tailwind CSS
-   **Routing**: React Router
-   **API Communication**: Axios
-   **Deployment**: Docker, Nginx


### 🔑 Environment Variables

This project requires an API key from The Movie Database.
1.  Create a file named `.env` in the root of the project.
2.  Add your API key to the file like this:
    ```
    VITE_TMDB_API_KEY=your_actual_api_key_here
    ```

### 💻 Running Locally (for Development)

1.  Clone the repository:
    ```sh
    git clone https://github.com/AnantSom/movie_vault.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd movie-app
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Start the development server:
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:5173](http://localhost:5173) in your browser.

### 🐳 Running with Docker (for Production)

1.  Clone the repository and navigate into the directory.
2.  Make sure you have created the `.env` file as described above.
3.  Run the production-ready container:
    ```sh
    npm run docker:prod
    ```
4.  The terminal will notify you when it's ready. Open [http://localhost:3000](http://localhost:3000) in your browser.

5.  To stop the container, run:
    ```sh
    npm run docker:stop
    ```