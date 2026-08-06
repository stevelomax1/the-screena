import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard/MovieCard";
import { useFavorites } from "../hooks/useFavorites";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className="page">
      <section className="content-section favorites-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your collection</p>
            <h1>Favorites</h1>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-empty-state">
            <Heart size={42} aria-hidden="true" />

            <h2>No favorites saved yet</h2>

            <p>Use the heart button on any movie or TV show to save it here.</p>

            <Link className="primary-button" to="/">
              Browse titles
            </Link>
          </div>
        ) : (
          <>
            <p className="results-count">
              {favorites.length}{" "}
              {favorites.length === 1 ? "favorite" : "favorites"} saved
            </p>

            <div className="movie-grid">
              {favorites.map((item) => (
                <MovieCard
                  key={`${item.mediaType}-${item.id}`}
                  item={item}
                  mediaType={item.mediaType}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Favorites;
