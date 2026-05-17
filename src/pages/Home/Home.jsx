import { useDailyQuote } from "../../hooks/useDailyQuote";
import { useRecords } from "../../contexts/RecordsContext";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { quotes } from "../../data/quotes";
import "./Home.css";

export function Home() {
  const { displayQuote, refreshQuote } = useDailyQuote(quotes);
  const { recordView, isRecordedToday } = useRecords();

  if (!displayQuote) {
    return (
      <div className="home">
        <div className="home__empty">Loading...</div>
      </div>
    );
  }

  const recorded = isRecordedToday(displayQuote.id);

  const handleRecord = () => {
    if (!recorded) {
      recordView(displayQuote.id);
    }
  };

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">Daily Read</h1>
        <p className="home__subtitle">每日英语 · 经典阅读</p>
      </header>

      <main className="home__main">
        <QuoteCard quote={displayQuote} variant="featured" />
      </main>

      <div className="home__actions">
        <button
          className={`home__record-btn ${recorded ? "home__record-btn--done" : ""}`}
          onClick={handleRecord}
          disabled={recorded}
        >
          {recorded ? "已记录" : "我已学习"}
        </button>
        <button className="home__refresh-btn" onClick={refreshQuote}>
          再来一句
        </button>
      </div>
    </div>
  );
}
