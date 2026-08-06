import MovieCard from "../MovieCard/MovieCard";

function SimilarTitles({
  items,
  mediaType,
  title,
  eyebrow,
  isLoading,
  errorMessage,
}) {
  if (isLoading) {
    return (
      <section className="similar-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
        </div>

        <div className="status-message">
          <p>Loading similar titles...</p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="similar-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
        </div>

        <div className="status-message">
          <p>Similar titles are unavailable right now.</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="similar-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="movie-grid">
        {items.slice(0, 5).map((item) => (
          <MovieCard
            key={`${mediaType}-${item.id}`}
            item={item}
            mediaType={mediaType}
          />
        ))}
      </div>
    </section>
  );
}

export default SimilarTitles;