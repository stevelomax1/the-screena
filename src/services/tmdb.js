import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

export async function getTrendingMovies() {
  try {
    const response = await tmdbApi.get("/trending/movie/week", {
      params: {
        language: "en-US",
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Unable to load trending movies:", error);

    throw new Error("We could not load trending movies.", {
      cause: error,
    });
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Unable to load movie details:", error);

    throw new Error("We could not load movie details.", {
      cause: error,
    });
  }
}

export async function getTrendingTVShows() {
  try {
    const response = await tmdbApi.get("/trending/tv/week", {
      params: {
        language: "en-US",
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Unable to load trending TV shows:", error);

    throw new Error("We could not load trending TV shows.", {
      cause: error,
    });
  }
}

export default tmdbApi;

export async function searchMoviesAndTVShows(searchTerm) {
  try {
    const response = await tmdbApi.get("/search/multi", {
      params: {
        query: searchTerm,
        language: "en-US",
        include_adult: false,
        page: 1,
      },
    });

    return response.data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv",
    );
  } catch (error) {
    console.error("Unable to search movies and TV shows:", error);

    throw new Error("We could not complete your search.", {
      cause: error,
    });
  }
}