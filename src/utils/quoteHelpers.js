export function getLocalDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getDailyQuote(quotes, previousId) {
  if (quotes.length === 0) return null;
  if (quotes.length === 1) return quotes[0];

  const pool = previousId ? quotes.filter((q) => q.id !== previousId) : quotes;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function getRandomQuote(quotes, excludeId) {
  if (quotes.length === 0) return null;
  if (quotes.length === 1) return quotes[0];
  const pool = excludeId ? quotes.filter((q) => q.id !== excludeId) : quotes;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

const DIFFICULTY_MAP = { "初级": "easy", "中级": "medium", "高级": "hard" };

export function searchQuotes(quotes, keyword) {
  if (!keyword || !keyword.trim()) return quotes;

  const k = keyword.toLowerCase().trim();
  const resolvedDifficulty = DIFFICULTY_MAP[k] || k;

  return quotes.filter((q) => {
    if (q.english.toLowerCase().includes(k)) return true;
    if (q.chinese.includes(k)) return true;
    if (q.source.toLowerCase().includes(k)) return true;
    if (q.difficulty === resolvedDifficulty) return true;
    if (q.scene && q.scene.includes(k)) return true;
    if (q.imitation && q.imitation.toLowerCase().includes(k)) return true;
    if (q.tags.some((t) => t.toLowerCase().includes(k))) return true;
    if (q.keyExpressions.some(
      (ke) =>
        ke.expression.toLowerCase().includes(k) ||
        ke.meaning.includes(k)
    )) return true;
    return false;
  });
}

export function getQuoteById(quotes, id) {
  return quotes.find((q) => q.id === id) || null;
}
