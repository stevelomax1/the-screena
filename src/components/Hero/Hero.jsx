import SearchBar from "../SearchBar/SearchBar";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Discover your next favorite</p>

        <h1>
          Movies and television worth getting excited about.
        </h1>

        <p className="hero-description">
          Explore trending entertainment, search thousands of titles, and save
          your favorites in one place.
        </p>

        <SearchBar />
      </div>

      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
    </section>
  );
}

export default Hero;