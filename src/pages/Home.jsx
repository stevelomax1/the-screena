import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import MovieCard from "../components/MovieCard/MovieCard";
import { getTrendingMovies } from "../services/tmdb";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadTrendingMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTrendingMovies();
  }, []);

  return (
    <main>
      <Hero />

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Popular now</p>
            <h2>Trending movies</h2>
          </div>
        </div>

        {isLoading && (
          <div className="status-message">
            <p>Loading trending movies...</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="status-message error-message" role="alert">
            <h3>Something went wrong</h3>
            <p>{errorMessage}</p>
          </div>
        )}

        {!isLoading && !errorMessage && movies.length === 0 && (
          <div className="status-message">
            <p>No trending movies were found.</p>
          </div>
        )}

        {!isLoading && !errorMessage && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;