import { quotes } from "../../data/quotes";
import { useFavorites } from "../../contexts/FavoritesContext";
import { getQuoteById } from "../../utils/quoteHelpers";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import "./Favorites.css";

export function Favorites() {
  const { favoriteIds } = useFavorites();

  const favoriteQuotes = favoriteIds
    .map((id) => getQuoteById(quotes, id))
    .filter(Boolean);

  return (
    <div className="favorites">
      <header className="favorites__header">
        <h1 className="favorites__title">我的收藏</h1>
        <p className="favorites__subtitle">
          {favoriteQuotes.length > 0
            ? `已收藏 ${favoriteQuotes.length} 条语句`
            : "还没有收藏"}
        </p>
      </header>

      <div className="favorites__list">
        {favoriteQuotes.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="还没有收藏"
            message="浏览语句时点击爱心图标即可收藏，收藏的句子会出现在这里"
            actionText="去探索"
            actionLink="/explore"
          />
        ) : (
          favoriteQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              variant="compact"
              showExpressions
            />
          ))
        )}
      </div>
    </div>
  );
}
