import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { getGame } from "../api/gamesApi";
import GameArtwork from "../components/GameArtwork";
import StatusMessage from "../components/StatusMessage";

function GameDetailsContent({ id }) {
  const location = useLocation();
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGame() {
      try {
        const data = await getGame(id, {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setGame(data);
          setStatus("success");
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError.message || "Could not load this game."
          );
          setStatus("error");
        }
      }
    }

    void loadGame();

    return () => {
      controller.abort();
    };
  }, [id, retryCount]);

  function retry() {
    setStatus("loading");
    setError("");
    setRetryCount((current) => current + 1);
  }

  return (
    <>
      <Link to="/" className="back-link">
        ← Back to catalogue
      </Link>

      {status === "loading" && (
        <StatusMessage title="Loading game...">
          <p>Preparing the game details.</p>
        </StatusMessage>
      )}

      {status === "error" && (
        <StatusMessage
          type="error"
          title="Unable to open game"
          actionLabel="Try again"
          onAction={retry}
        >
          <p>{error}</p>
        </StatusMessage>
      )}

      {status === "success" && game && (
        <>
          {location.state?.message && (
            <StatusMessage
              type="success"
              title={location.state.message}
            >
              <p>Your game is now available in this browser.</p>
            </StatusMessage>
          )}

          <article className="details-layout">
            <GameArtwork
              title={game.title}
              category={game.category}
            />

            <div className="details-content">
              <span className="badge">{game.category}</span>
              <h1>{game.title}</h1>

              <p className="details-intro">
                Discover your next table favourite.
              </p>

              <dl className="stats-grid">
                <div>
                  <dt>Players</dt>
                  <dd>
                    {game.minPlayers}–{game.maxPlayers}
                  </dd>
                </div>

                <div>
                  <dt>Duration</dt>
                  <dd>{game.duration} min</dd>
                </div>

                <div>
                  <dt>Rating</dt>
                  <dd>★ {game.rating.toFixed(1)}</dd>
                </div>
              </dl>

              <section className="description">
                <h2>About this game</h2>
                <p>{game.description}</p>
              </section>

              <p className="small muted">
                Added on{" "}
                {new Date(game.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </article>
        </>
      )}
    </>
  );
}

export default function GameDetailsPage() {
  const { id } = useParams();

  return <GameDetailsContent key={id} id={id} />;
}