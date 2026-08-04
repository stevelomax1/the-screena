import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      return;
    }

    console.log("Searching for:", trimmedSearchTerm);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="media-search">
        Search for movies and TV shows
      </label>

      <div className="search-input-wrapper">
        <Search size={21} aria-hidden="true" />

        <input
          id="media-search"
          type="search"
          placeholder="Search movies and TV shows..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;