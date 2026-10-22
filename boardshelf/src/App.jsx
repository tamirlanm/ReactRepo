import { Link, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import CatalogPage from "./pages/CatalogPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import AddGamePage from "./pages/AddGamePage";

function NotFoundPage() {
  return (
    <section className="not-found">
      <span className="eyebrow">404</span>
      <h1>This shelf is empty.</h1>
      <p>The page you are looking for does not exist.</p>

      <Link to="/" className="button">
        Back to catalogue
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CatalogPage />} />
        <Route path="games/:id" element={<GameDetailsPage />} />
        <Route path="add" element={<AddGamePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}