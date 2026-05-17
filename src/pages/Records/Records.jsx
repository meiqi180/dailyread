import { useState, useMemo } from "react";
import { quotes } from "../../data/quotes";
import { useRecords } from "../../contexts/RecordsContext";
import { getLocalDateStr } from "../../utils/quoteHelpers";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import "./Records.css";

function dateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatGroupLabel(date) {
  const todayStr = getLocalDateStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = dateStr(yesterday);

  if (date === todayStr) return "今天";
  if (date === yesterdayStr) return "昨天";

  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

function groupByDate(records) {
  const groups = [];
  records.forEach((r) => {
    const { date } = r;
    let group = groups.find((g) => g.date === date);
    if (!group) {
      group = { date, label: formatGroupLabel(date), items: [] };
      groups.push(group);
    }
    group.items.push(r);
  });
  return groups;
}

export function Records() {
  const [keyword, setKeyword] = useState("");
  const { searchRecords } = useRecords();

  const filtered = searchRecords(quotes, keyword);
  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  return (
    <div className="records">
      <header className="records__header">
        <h1 className="records__title">学习记录</h1>
        <p className="records__subtitle">
          {filtered.length > 0
            ? `已学习 ${filtered.length} 条语句`
            : "还没有学习记录"}
        </p>
      </header>

      {filtered.length > 0 && (
        <div className="records__search">
          <SearchBar
            value={keyword}
            onChange={setKeyword}
            placeholder="搜索学过的语句…"
          />
        </div>
      )}

      <div className="records__list">
        {filtered.length === 0 && !keyword ? (
          <EmptyState
            icon="📝"
            title="还没有学习记录"
            message="在首页或探索页点击「我已学习」后，学习记录会保存在这里。"
            actionText="去探索"
            actionLink="/explore"
          />
        ) : filtered.length === 0 && keyword ? (
          <EmptyState
            icon="🔍"
            title="没有找到匹配的记录"
            message="换个关键词试试吧"
          />
        ) : (
          grouped.map((group) => (
            <div key={group.date} className="records__group">
              <h2 className="records__date-heading">{group.label}</h2>
              <div className="records__group-items">
                {group.items.map((quote) => (
                  <QuoteCard
                    key={quote.id + quote.date}
                    quote={quote}
                    variant="compact"
                    recordButtonMode="review"
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
