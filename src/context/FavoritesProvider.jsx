import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("screena-favorites");

      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Unable to load favorites:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "screena-favorites",
      JSON.stringify(favorites),
    );
  }, [favorites]);

  function isFavorite(id, mediaType) {
    return favorites.some(
      (item) => item.id === id && item.mediaType === mediaType,
    );
  }

  function addFavorite(item, mediaType) {
    const favoriteItem = {
      id: item.id,
      mediaType,
      title: item.title || item.name,
      poster_path: item.poster_path,
      release_date: item.release_date,
      first_air_date: item.first_air_date,
      vote_average: item.vote_average,
    };

    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (favorite) =>
          favorite.id === item.id &&
          favorite.mediaType === mediaType,
      );

      if (alreadySaved) {
        return currentFavorites;
      }

      return [...currentFavorites, favoriteItem];
    });
  }

  function removeFavorite(id, mediaType) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (item) =>
          !(item.id === id && item.mediaType === mediaType),
      ),
    );
  }

  function toggleFavorite(item, mediaType) {
    if (isFavorite(item.id, mediaType)) {
      removeFavorite(item.id, mediaType);
    } else {
      addFavorite(item, mediaType);
    }
  }

  const value = {
  favorites,
  isFavorite,
  addFavorite,
  removeFavorite,
  toggleFavorite,
};

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

