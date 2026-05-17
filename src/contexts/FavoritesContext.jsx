import { createContext, useContext, useState, useCallback } from "react";
import { get, set } from "../utils/storage";

const STORAGE_KEY = "favorites";
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => get(STORAGE_KEY, []));

  const isFavorite = useCallback(
    (id) => favoriteIds.includes(id),
    [favoriteIds]
  );

  const toggleFavorite = useCallback((id) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id];
      set(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
