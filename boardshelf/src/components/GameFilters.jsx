import { CATEGORIES, SORT_OPTIONS } from "../data/options";

export default function GameFilters({
  filters,
  onChange,
  onReset,
}) {
  return (
    <section className="filters-panel" aria-label="Catalogue filters">
      <div className="filters-grid">
        <label className="field search-field">
          <span>Search games</span>
          <input
            type="search"
            placeholder="Search by title or description"
            value={filters.search}
            onChange={(event) =>
              onChange("search", event.target.value)
            }
          />
        </label>

        <label className="field">
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(event) =>
              onChange("category", event.target.value)
            }
          >
            <option value="">All categories</option>

            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Your group</span>
          <select
            value={filters.players}
            onChange={(event) =>
              onChange("players", event.target.value)
            }
          >
            <option value="">Any player count</option>

            {Array.from({ length: 20 }, (_, index) => index + 1).map(
              (count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "player" : "players"}
                </option>
              )
            )}
          </select>
        </label>

        <label className="field">
          <span>Sort by</span>
          <select
            value={filters.sort}
            onChange={(event) =>
              onChange("sort", event.target.value)
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        className="text-button"
        onClick={onReset}
      >
        Reset filters
      </button>
    </section>
  );
}