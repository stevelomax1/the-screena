function LoadingGrid({ count = 5 }) {
  return (
    <div className="movie-grid" aria-label="Loading titles">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-poster" />

          <div className="skeleton-content">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-meta" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingGrid;