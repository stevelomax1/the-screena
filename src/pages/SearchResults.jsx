import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard/MovieCard";
import { searchMoviesAndTVShows } from "../services/tmdb";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query")?.trim() || "";

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadSearchResults() {
      if (!searchTerm) {
        setResults([]);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const searchResults = await searchMoviesAndTVShows(searchTerm);
        setResults(searchResults);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadSearchResults();
  }, [searchTerm]);

  return (
    <main className="page">
      <section className="content-section search-results-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Search results</p>

            <h1>
              {searchTerm
                ? `Results for “${searchTerm}”`
                : "Search movies and TV shows"}
            </h1>
          </div>
        </div>

        {!searchTerm && (
          <div className="status-message">
            <p>Enter a movie or television title in the search bar.</p>
          </div>
        )}

        {isLoading && (
          <div className="status-message">
            <p>Searching for “{searchTerm}”...</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="status-message error-message" role="alert">
            <div>
              <h2>Something went wrong</h2>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          searchTerm &&
          results.length === 0 && (
            <div className="status-message">
              <div>
                <h2>No results found</h2>
                <p>Try searching with a different title.</p>
              </div>
            </div>
          )}

        {!isLoading && !errorMessage && results.length > 0 && (
          <>
            <p className="results-count">
              {results.length} {results.length === 1 ? "result" : "results"} found
            </p>

            <div className="movie-grid">
              {results.map((item) => (
                <MovieCard
                  key={`${item.media_type}-${item.id}`}
                  item={item}
                  mediaType={item.media_type}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default SearchResults;