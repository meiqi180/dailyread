import "./ExpressionItem.css";

export function ExpressionItem({ expression, meaning, example }) {
  return (
    <li className="expression-item">
      <div className="expression-item__main">
        <span className="expression-item__expr">{expression}</span>
        <span className="expression-item__meaning">{meaning}</span>
      </div>
      <p className="expression-item__example">{example}</p>
    </li>
  );
}
