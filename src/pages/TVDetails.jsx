import {
  ArrowLeft,
  CalendarDays,
  Heart,
  Layers3,
  Play,
  Star,
  Tv,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { getTVDetails } from "../services/tmdb";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function TVDetails() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadTVDetails() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const tvDetails = await getTVDetails(id);
        setShow(tvDetails);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTVDetails();
  }, [id]);

  if (isLoading) {
    return (
      <main className="details-page">
        <div className="details-status">
          <p>Loading TV show details...</p>
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

  if (!show) {
    return null;
  }

  const saved = isFavorite(show.id, "tv");

  const firstAirYear = show.first_air_date
    ? show.first_air_date.slice(0, 4)
    : "Date unavailable";

  const lastAirYear = show.last_air_date
    ? show.last_air_date.slice(0, 4)
    : null;

  const yearRange =
    lastAirYear && lastAirYear !== firstAirYear
      ? `${firstAirYear}–${lastAirYear}`
      : firstAirYear;

  const rating =
    typeof show.vote_average === "number"
      ? show.vote_average.toFixed(1)
      : "Not rated";

  const trailer = show.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official,
  );

  const fallbackTrailer = show.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  const selectedTrailer = trailer || fallbackTrailer;

  const backdropStyle = show.backdrop_path
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
          url("${BACKDROP_BASE_URL}${show.backdrop_path}")
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
              {show.poster_path ? (
                <img
                  className="details-poster"
                  src={`${POSTER_BASE_URL}${show.poster_path}`}
                  alt={`${show.name} poster`}
                />
              ) : (
                <div className="details-poster details-poster-placeholder">
                  No poster available
                </div>
              )}
            </div>

            <div className="details-content">
              {show.tagline && (
                <p className="details-tagline">{show.tagline}</p>
              )}

              <h1>{show.name}</h1>

              <div className="details-meta">
                <span>
                  <CalendarDays size={18} aria-hidden="true" />
                  {yearRange}
                </span>

                <span>
                  <Layers3 size={18} aria-hidden="true" />
                  {show.number_of_seasons}{" "}
                  {show.number_of_seasons === 1 ? "season" : "seasons"}
                </span>

                <span>
                  <Tv size={18} aria-hidden="true" />
                  {show.number_of_episodes}{" "}
                  {show.number_of_episodes === 1 ? "episode" : "episodes"}
                </span>

                <span className="details-rating">
                  <Star size={18} aria-hidden="true" />
                  {rating}
                </span>
              </div>

              {show.status && (
                <p className="show-status">
                  Status: <strong>{show.status}</strong>
                </p>
              )}

              {show.genres?.length > 0 && (
                <div className="genre-list" aria-label="TV show genres">
                  {show.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
              )}

              <div className="details-overview">
                <h2>Overview</h2>

                <p>
                  {show.overview ||
                    "An overview is not available for this TV show."}
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

                <button
                  type="button"
                  className={
                    saved
                      ? "secondary-button favorite-details-button active"
                      : "secondary-button favorite-details-button"
                  }
                  onClick={() => toggleFavorite(show, "tv")}
                  aria-pressed={saved}
                >
                  <Heart
                    size={19}
                    fill={saved ? "currentColor" : "none"}
                    aria-hidden="true"
                  />

                  {saved ? "Remove favorite" : "Add to favorites"}
                </button>

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

export default TVDetails;