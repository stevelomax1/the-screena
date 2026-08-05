import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import MovieCard from "../components/MovieCard/MovieCard";
import {
  getTrendingMovies,
  getTrendingTVShows,
} from "../services/tmdb";

function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadTrendingContent() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [trendingMovies, trendingTVShows] = await Promise.all([
          getTrendingMovies(),
          getTrendingTVShows(),
        ]);

        setMovies(trendingMovies);
        setTVShows(trendingTVShows);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTrendingContent();
  }, []);

  return (
    <main>
      <Hero />

      <section className="content-section">
        {isLoading && (
          <div className="status-message">
            <p>Loading trending movies and TV shows...</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="status-message error-message" role="alert">
            <div>
              <h3>Something went wrong</h3>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {!isLoading && !errorMessage && (
          <>
            <section className="media-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Popular now</p>
                  <h2>Trending movies</h2>
                </div>
              </div>

              {movies.length > 0 ? (
                <div className="movie-grid">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      item={movie}
                      mediaType="movie"
                    />
                  ))}
                </div>
              ) : (
                <div className="status-message">
                  <p>No trending movies were found.</p>
                </div>
              )}
            </section>

            <section className="media-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">What everyone is watching</p>
                  <h2>Trending TV shows</h2>
                </div>
              </div>

              {tvShows.length > 0 ? (
                <div className="movie-grid">
                  {tvShows.map((show) => (
                    <MovieCard
                      key={show.id}
                      item={show}
                      mediaType="tv"
                    />
                  ))}
                </div>
              ) : (
                <div className="status-message">
                  <p>No trending TV shows were found.</p>
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  );
}

export default Home;