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