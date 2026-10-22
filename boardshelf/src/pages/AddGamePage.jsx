import { Link, useNavigate } from "react-router";
import GameForm from "../components/GameForm";

export default function AddGamePage() {
  const navigate = useNavigate();

  function handleCreated(game) {
  void navigate(`/games/${game.id}`, {
    replace: true,
    state: {
      message: "Game added successfully!",
    },
  });
}

  return (
    <section className="add-page">
      <Link to="/" className="back-link">
        ← Back to catalogue
      </Link>

      <div className="page-heading">
        <span className="eyebrow">GROW YOUR COLLECTION</span>
        <h1>Add a board game</h1>
        <p>
          Share a game worth bringing to the table.
          Your entry will be saved in this browser.
        </p>
      </div>

      <GameForm onCreated={handleCreated} />
    </section>
  );
}