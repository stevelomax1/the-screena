import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Play,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const movieDetails = await getMovieDetails(id);
        setMovie(movieDetails);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <main className="details-page">
        <div className="details-status">
          <p>Loading movie details...</p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="details-page">
        <div className="details-status error-message" role="alert">
          <div>
            <h1>Something went wrong</h1>
            <p>{errorMessage}</p>

            <Link className="secondary-button" to="/">
              <ArrowLeft size={18} aria-hidden="true" />
              Return home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!movie) {
    return null;
  }

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "Release date unavailable";

  const formattedRuntime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "Runtime unavailable";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "Not rated";

  const trailer = movie.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official,
  );

  const fallbackTrailer = movie.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  const selectedTrailer = trailer || fallbackTrailer;

  const backdropStyle = movie.backdrop_path
    ? {
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(7, 8, 13, 0.98) 0%,
            rgba(7, 8, 13, 0.86) 45%,
            rgba(7, 8, 13, 0.42) 100%
          ),
          linear-gradient(
            0deg,
            #07080d 0%,
            rgba(7, 8, 13, 0.12) 55%
          ),
          url("${BACKDROP_BASE_URL}${movie.backdrop_path}")
        `,
      }
    : undefined;

  return (
    <main className="details-page">
      <section className="details-hero" style={backdropStyle}>
        <div className="details-container">
          <Link className="back-link" to="/">
            <ArrowLeft size={18} aria-hidden="true" />
            Back to discover
          </Link>

          <div className="details-layout">
            <div className="details-poster-container">
              {movie.poster_path ? (
                <img
                  className="details-poster"
                  src={`${POSTER_BASE_URL}${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
              ) : (
                <div className="details-poster details-poster-placeholder">
                  No poster available
                </div>
              )}
            </div>

            <div className="details-content">
              {movie.tagline && (
                <p className="details-tagline">{movie.tagline}</p>
              )}

              <h1>{movie.title}</h1>

              <div className="details-meta">
                <span>
                  <CalendarDays size={18} aria-hidden="true" />
                  {releaseYear}
                </span>

                <span>
                  <Clock3 size={18} aria-hidden="true" />
                  {formattedRuntime}
                </span>

                <span className="details-rating">
                  <Star size={18} aria-hidden="true" />
                  {rating}
                </span>
              </div>

              {movie.genres?.length > 0 && (
                <div className="genre-list" aria-label="Movie genres">
                  {movie.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
              )}

              <div className="details-overview">
                <h2>Overview</h2>

                <p>
                  {movie.overview ||
                    "An overview is not available for this movie."}
                </p>
              </div>

              <div className="details-actions">
                {selectedTrailer && (
                  <a
                    className="primary-button"
                    href={`https://www.youtube.com/watch?v=${selectedTrailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Play size={19} aria-hidden="true" />
                    Watch trailer
                  </a>
                )}

                <Link className="secondary-button" to="/favorites">
                  View favorites
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;