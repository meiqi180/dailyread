import { createContext, useContext, useState, useCallback } from "react";
import { get, set } from "../utils/storage";
import { getLocalDateStr } from "../utils/quoteHelpers";

const STORAGE_KEY = "records";
const RecordsContext = createContext(null);

const DIFFICULTY_MAP = { "初级": "easy", "中级": "medium", "高级": "hard" };

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState(() => get(STORAGE_KEY, []));

  const recordView = useCallback((quoteId) => {
    setRecords((prev) => {
      const today = getLocalDateStr();
      const exists = prev.find(
        (r) => r.quoteId === quoteId && r.date === today
      );
      if (exists) return prev;

      const next = [
        { id: `${quoteId}_${today}`, quoteId, date: today, viewedAt: new Date().toISOString() },
        ...prev,
      ];
      set(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const isRecordedToday = useCallback(
    (quoteId) => {
      const today = getLocalDateStr();
      return records.some(
        (r) => r.quoteId === quoteId && r.date === today
      );
    },
    [records]
  );

  const getRecordsWithQuotes = useCallback(
    (quotes) => {
      return records
        .map((r) => {
          const quote = quotes.find((q) => q.id === r.quoteId);
          return quote ? { ...quote, date: r.date, viewedAt: r.viewedAt } : null;
        })
        .filter(Boolean);
    },
    [records]
  );

  const searchRecords = useCallback(
    (quotes, keyword) => {
      const all = getRecordsWithQuotes(quotes);
      if (!keyword || !keyword.trim()) return all;
      const k = keyword.toLowerCase().trim();
      const resolvedDifficulty = DIFFICULTY_MAP[k] || k;
      return all.filter(
        (q) =>
          q.english.toLowerCase().includes(k) ||
          q.chinese.includes(k) ||
          q.source.toLowerCase().includes(k) ||
          q.difficulty === resolvedDifficulty ||
          (q.scene && q.scene.includes(k)) ||
          (q.imitation && q.imitation.toLowerCase().includes(k)) ||
          q.tags.some((t) => t.toLowerCase().includes(k)) ||
          q.keyExpressions.some(
            (ke) =>
              ke.expression.toLowerCase().includes(k) ||
              ke.meaning.includes(k)
          )
      );
    },
    [getRecordsWithQuotes]
  );

  return (
    <RecordsContext.Provider value={{ records, recordView, isRecordedToday, getRecordsWithQuotes, searchRecords }}>
      {children}
    </RecordsContext.Provider>
  );
}

export function useRecords() {
  const ctx = useContext(RecordsContext);
  if (!ctx) throw new Error("useRecords must be used within RecordsProvider");
  return ctx;
}
