
function FilterBar({
  filter,
  onFilterChange,
  onReverse,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        {[
          "All",
          "Planned",
          "In Progress",
          "Completed",
        ].map((status) => (
          <button
            key={status}
            className={
              filter === status
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => onFilterChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <button
        className="reverse-button"
        onClick={onReverse}
      >
        Reverse list
      </button>
    </div>
  );
}

export default FilterBar;