import { useRecords } from "../../contexts/RecordsContext";
import { ExpressionItem } from "../ExpressionItem/ExpressionItem";
import { PronunciationBtn } from "../PronunciationBtn/PronunciationBtn";
import { FavoriteBtn } from "../FavoriteBtn/FavoriteBtn";
import "./QuoteCard.css";

export function QuoteCard({ quote, variant = "compact", showExpressions = false, recordButtonMode = "learn" }) {
  const { recordView, isRecordedToday } = useRecords();

  if (!quote) {
    return (
      <div className="quote-card quote-card--empty">
        <p>No quote available</p>
      </div>
    );
  }

  const isFeatured = variant === "featured";
  const recorded = isRecordedToday(quote.id);

  const handleRecord = () => {
    if (!recorded) {
      recordView(quote.id);
    }
  };

  const showRecordBtn = recordButtonMode !== "hidden" && !isFeatured;

  const recordLabel = () => {
    if (recorded) {
      return recordButtonMode === "review" ? "今日已复习" : "已记录";
    }
    return recordButtonMode === "review" ? "再次复习" : "我已学习";
  };

  return (
    <article className={`quote-card ${isFeatured ? "quote-card--featured" : "quote-card--compact"}`}>
      <div className="quote-card__header">
        <div className="quote-card__header-left">
          <span className="quote-card__type">{quote.type}</span>
          {quote.difficulty && (
            <span className={`quote-card__difficulty quote-card__difficulty--${quote.difficulty}`}>
              {quote.difficulty === "easy" ? "初级" : quote.difficulty === "medium" ? "中级" : "高级"}
            </span>
          )}
        </div>
        <div className="quote-card__actions">
          <PronunciationBtn text={quote.english} />
          <FavoriteBtn quoteId={quote.id} />
        </div>
      </div>

      <blockquote className="quote-card__english">
        {quote.english}
      </blockquote>

      <p className="quote-card__chinese">{quote.chinese}</p>

      <div className="quote-card__source">
        <span className="quote-card__source-name">— {quote.source}</span>
        {isFeatured && (
          <span className="quote-card__source-bio">{quote.authorBio}</span>
        )}
      </div>

      {quote.scene && (
        <div className="quote-card__scene">
          <span className="quote-card__scene-label">适用场景：</span>
          {quote.scene}
        </div>
      )}

      {isFeatured && (
        <div className="quote-card__analysis">
          <h3 className="quote-card__section-title">表达解析</h3>
          <p>{quote.analysis}</p>
        </div>
      )}

      {isFeatured && quote.imitation && (
        <div className="quote-card__imitation">
          <h3 className="quote-card__section-title">仿写参考</h3>
          <p className="quote-card__imitation-text">{quote.imitation}</p>
        </div>
      )}

      {(isFeatured || showExpressions) && quote.keyExpressions.length > 0 && (
        <div className="quote-card__expressions">
          <h3 className="quote-card__section-title">重点表达</h3>
          <ul className="quote-card__expression-list">
            {quote.keyExpressions.map((ke, i) => (
              <ExpressionItem key={i} expression={ke.expression} meaning={ke.meaning} example={ke.example} />
            ))}
          </ul>
        </div>
      )}

      <div className="quote-card__tags">
        {quote.tags.map((tag) => (
          <span key={tag} className="quote-card__tag">#{tag}</span>
        ))}
      </div>

      {showRecordBtn && (
        <div className="quote-card__footer">
          {quote.date && (
            <div className="quote-card__viewed">{formatDateLabel(quote.date)}</div>
          )}
          <button
            className={`quote-card__record-btn ${recorded ? "quote-card__record-btn--done" : ""}`}
            onClick={handleRecord}
            disabled={recorded}
          >
            {recordLabel()}
          </button>
        </div>
      )}
    </article>
  );
}

function formatDateLabel(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dObj = new Date(y, m - 1, d);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateStr === dateToStr(today)) return "今天学习";
  if (dateStr === dateToStr(yesterday)) return "昨天学习";

  const diffDays = Math.floor((today - dObj) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) return `${diffDays}天前学习`;
  return dObj.toLocaleDateString("zh-CN");
}

function dateToStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
