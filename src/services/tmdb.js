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

export async function getMovieDetails(movieId) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        language: "en-US",
        append_to_response: "videos",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Unable to load movie ${movieId}:`, error);

    throw new Error("We could not load this movie.", {
      cause: error,
    });
  }
}

export async function getTVDetails(tvId) {
  try {
    const response = await tmdbApi.get(`/tv/${tvId}`, {
      params: {
        language: "en-US",
        append_to_response: "videos",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Unable to load TV show ${tvId}:`, error);

    throw new Error("We could not load this TV show.", {
      cause: error,
    });
  }
}

export async function getSimilarMovies(movieId) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`, {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error(`Unable to load movies similar to ${movieId}:`, error);

    throw new Error("We could not load similar movies.", {
      cause: error,
    });
  }
}

export async function getSimilarTVShows(tvId) {
  try {
    const response = await tmdbApi.get(`/tv/${tvId}/similar`, {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error(`Unable to load TV shows similar to ${tvId}:`, error);

    throw new Error("We could not load similar TV shows.", {
      cause: error,
    });
  }
}

export default tmdbApi;