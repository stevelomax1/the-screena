import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ item, mediaType }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : "Coming soon";

  const rating =
    typeof item.vote_average === "number"
      ? item.vote_average.toFixed(1)
      : "Not rated";

  const saved = isFavorite(item.id, mediaType);

  function handleFavoriteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(item, mediaType);
  }

  return (
    <article className="movie-card">
      <Link
        to={`/${mediaType}/${item.id}`}
        className="movie-card-link"
        aria-label={`View details for ${title}`}
      >
        <div className="movie-poster-wrapper">
          {item.poster_path ? (
            <img
              className="movie-poster"
              src={`${IMAGE_BASE_URL}${item.poster_path}`}
              alt={`${title} poster`}
              loading="lazy"
            />
          ) : (
            <div className="movie-poster-placeholder">
              <span>No poster available</span>
            </div>
          )}

          <button
            type="button"
            className={
              saved
                ? "favorite-button favorite-button-active"
                : "favorite-button"
            }
            onClick={handleFavoriteClick}
            aria-label={
              saved
                ? `Remove ${title} from favorites`
                : `Add ${title} to favorites`
            }
          >
            <Heart
              size={19}
              fill={saved ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="movie-card-content">
          <h3 title={title}>{title}</h3>

          <div className="movie-card-meta">
            <span>{releaseYear}</span>

            <span className="movie-rating">
              <Star size={16} aria-hidden="true" />
              {rating}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;
