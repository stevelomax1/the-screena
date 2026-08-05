import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import TVDetails from "./pages/TVDetails";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/tv/:id" element={<TVDetails />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
