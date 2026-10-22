import { Link, NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-content">
          <Link to="/" className="brand">
            <span className="brand-icon" aria-hidden="true">
              ⬡
                        </span>
            <span>BoardShelf</span>
          </Link>

          <nav className="navigation" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Catalogue
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Add game
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <strong>BoardShelf</strong>
          <p>
            Find a game for your next evening together.
          </p>
          <p className="small">
            Educational project. Initial game characteristics are
            demonstration data. New entries are saved in this browser.
          </p>
        </div>
      </footer>
    </div>
  );
}