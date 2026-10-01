import { useState } from "react";

function DashboardItem({
  item,
  visible,
  onRemove,
  onStatusChange,
  onReset,
}) {
  console.log(`DashboardItem rendered: ${item.title}`);

  const [studySessions, setStudySessions] = useState(0);
  const [favorite, setFavorite] = useState(false);

  return (
    <article
      className="course-card"
      hidden={!visible}
    >
      <div className="card-top">
        <div>
          <span className="category">
            {item.category}
          </span>

          <h2>{item.title}</h2>
        </div>

        <button
          className="delete-button"
          onClick={() => onRemove(item.id)}
        >
          ×
        </button>
      </div>

      <div className="course-info">
        <span>
          Difficulty: {item.difficulty}
        </span>

        <span>
          Sessions: {studySessions}
        </span>
      </div>

      <label>
        Status
        <select
          value={item.status}
          onChange={(event) =>
            onStatusChange(
              item.id,
              event.target.value
            )
          }
        >
          <option>Planned</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </label>

      <div className="local-state">
        <p>
          Local state:
          <strong> {studySessions} sessions</strong>
        </p>

        <div className="card-actions">
          <button
            onClick={() =>
              setStudySessions(
                (current) => current + 1
              )
            }
          >
            + Session
          </button>

          <button
            onClick={() =>
              setFavorite(
                (current) => !current
              )
            }
          >
            {favorite ? "Favorite" : "Not Favorite"}
          </button>
        </div>
      </div>

      <button
        className="reset-button"
        onClick={() => onReset(item.id)}
      >
        Reset local state
      </button>
    </article>
  );
}

export default DashboardItem;