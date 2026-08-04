import Hero from "../components/Hero/Hero";

function Home() {
  return (
    <main>
      <Hero />

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Popular now</p>
            <h2>Trending this week</h2>
          </div>
        </div>

        <div className="empty-results">
          <p>Trending movies and TV shows will appear here.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;