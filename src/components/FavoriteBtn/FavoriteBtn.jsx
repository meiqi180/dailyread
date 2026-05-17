import { useFavorites } from "../../contexts/FavoritesContext";
import "./FavoriteBtn.css";

export function FavoriteBtn({ quoteId }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(quoteId);

  return (
    <button
      className={`fav-btn ${favorited ? "fav-btn--active" : ""}`}
      onClick={() => toggleFavorite(quoteId)}
      title={favorited ? "取消收藏" : "收藏"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
