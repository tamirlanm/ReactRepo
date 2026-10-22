const CATEGORY_SYMBOLS = {
  Strategy: "♜",
  Family: "✦",
  Cooperative: "⚑",
  Party: "★",
  Abstract: "⬡",
};

export default function GameArtwork({ title, category }) {
  return (
    <div
      className={`game-artwork artwork-${category.toLowerCase()}`}
      aria-hidden="true"
    >
      <span className="artwork-category">{category}</span>

      <span className="artwork-symbol">
        {CATEGORY_SYMBOLS[category] || "⬡"}
      </span>

      <span className="artwork-title">{title}</span>
    </div>
  );
}