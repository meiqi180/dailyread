import { useState, useCallback } from "react";
import { get, set } from "../utils/storage";
import { getLocalDateStr, getDailyQuote, getRandomQuote } from "../utils/quoteHelpers";

const STORAGE_KEY = "daily";

export function useDailyQuote(quotes) {
  const [dailyQuote] = useState(() => {
    const today = getLocalDateStr();
    const saved = get(STORAGE_KEY, null);

    if (saved && saved.date === today) {
      const found = quotes.find((q) => q.id === saved.quoteId);
      if (found) return found;
    }

    const newQuote = getDailyQuote(quotes, saved?.quoteId);
    if (newQuote) {
      set(STORAGE_KEY, { quoteId: newQuote.id, date: today });
    }
    return newQuote;
  });

  const [displayQuote, setDisplayQuote] = useState(dailyQuote);

  const refreshQuote = useCallback(() => {
    const next = getRandomQuote(quotes, displayQuote.id);
    if (next) setDisplayQuote(next);
  }, [quotes, displayQuote.id]);

  return { dailyQuote, displayQuote, refreshQuote };
}
