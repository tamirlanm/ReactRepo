import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getGames } from "../api/gamesApi";
import { PAGE_SIZE } from "../data/options";
import GameCard from "../components/GameCard";
import GameFilters from "../components/GameFilters";
import Pagination from "../components/Pagination";
import StatusMessage from "../components/StatusMessage";

const INITIAL_FILTERS = {
  search: "",
  category: "",
  players: "",
  sort: "rating-desc",
  page: 1,
};

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    ...INITIAL_FILTERS,
  });

  const [result, setResult] = useState({
    items: [],
    total: 0,
    collectionSize: 0,
    totalPages: 1,
    page: 1,
  });

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        const data = await getGames({
          ...filters,
          pageSize: PAGE_SIZE,
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setResult(data);
          setStatus("success");
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError.message || "Could not load the catalogue."
          );
          setStatus("error");
        }
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [filters, retryCount]);

  function changeFilter(name, value) {
    setStatus("loading");
    setError("");

    setFilters((current) => ({
      ...current,
      [name]: value,
      page: 1,
    }));
  }

  function resetFilters() {
    setStatus("loading");
    setError("");
    setFilters({ ...INITIAL_FILTERS });
  }

  function changePage(page) {
    setStatus("loading");
    setError("");

    setFilters((current) => ({
      ...current,
      page,
    }));
  }

  function retry() {
    setStatus("loading");
    setError("");
    setRetryCount((current) => current + 1);
  }

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">GOOD GAMES. GREAT COMPANY.</span>
          <h1>Your next game night starts here.</h1>
          <p>
            Explore the collection, find a game for your group,
            and add your own favourites.
          </p>

          <Link to="/add" className="button">
            Add a game
          </Link>
        </div>

        <div className="hero-decoration" aria-hidden="true">
          <span>♜</span>
          <span>⬡</span>
          <span>★</span>
        </div>
      </section>

      <GameFilters
        filters={filters}
        onChange={changeFilter}
        onReset={resetFilters}
      />

      <section aria-label="Game results" aria-busy={status === "loading"}>
        {status === "loading" && (
          <StatusMessage title="Loading games...">
            <p>Finding the right games for your shelf.</p>
          </StatusMessage>
        )}

        {status === "error" && (
          <StatusMessage
            type="error"
            title="Unable to load games"
            actionLabel="Try again"
            onAction={retry}
          >
            <p>{error}</p>
            <p>
              Make sure browser storage is available, then try again.
            </p>
          </StatusMessage>
        )}

        {status === "success" && result.items.length === 0 && (
          <StatusMessage
            title="No games found"
            actionLabel="Reset filters"
            onAction={resetFilters}
          >
            <p>
              Try another search, category, or player count.
            </p>
          </StatusMessage>
        )}

        {status === "success" && result.items.length > 0 && (
          <>
            <div className="results-heading">
              <h2>Explore the shelf</h2>
              <p>
                {result.total} matching games ·{" "}
                {result.collectionSize} in collection
              </p>
            </div>

            <div className="games-grid">
              {result.items.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              onPageChange={changePage}
            />
          </>
        )}
      </section>
    </>
  );
}