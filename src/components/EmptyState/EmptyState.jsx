import { Link } from "react-router-dom";
import "./EmptyState.css";

export function EmptyState({ icon, title, message, actionText, actionLink }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon ?? "📖"}</div>
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__message">{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="empty-state__action">
          {actionText}
        </Link>
      )}
    </div>
  );
}
