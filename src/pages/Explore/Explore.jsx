import { useState, useMemo } from "react";
import { quotes } from "../../data/quotes";
import { searchQuotes } from "../../utils/quoteHelpers";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import "./Explore.css";

export function Explore() {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => searchQuotes(quotes, keyword), [keyword]);

  return (
    <div className="explore">
      <header className="explore__header">
        <h1 className="explore__title">探索更多</h1>
        <p className="explore__subtitle">浏览所有经典语句</p>
      </header>

      <div className="explore__search">
        <SearchBar value={keyword} onChange={setKeyword} />
      </div>

      <div className="explore__list">
        {filtered.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="没有找到匹配的语句"
            message="换个关键词试试吧"
          />
        ) : (
          filtered.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} variant="compact" />
          ))
        )}
      </div>
    </div>
  );
}
