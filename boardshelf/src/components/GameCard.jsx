import { Link } from "react-router";
import GameArtwork from "./GameArtwork";

export default function GameCard({ game }) {
  return (
    <article className="game-card">
      <Link
        to={`/games/${game.id}`}
        className="card-link"
        aria-label={`View ${game.title}`}
      >
        <GameArtwork
          title={game.title}
          category={game.category}
        />

        <div className="card-content">
          <div className="card-heading">
            <span className="badge">{game.category}</span>
            <span className="rating">
              ★ {game.rating.toFixed(1)}
            </span>
          </div>

          <h2>{game.title}</h2>

          <div className="card-meta">
            <span>
              {game.minPlayers}–{game.maxPlayers} players
            </span>
            <span>{game.duration} min</span>
          </div>

          <span className="card-action">
            View game →
          </span>
        </div>
      </Link>
    </article>
  );
}