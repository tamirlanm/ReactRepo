
import { NavLink } from "react-router";
import { useAuth } from "../context/authContext";
import { useAuthAction } from "../hooks/useAuthAction";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/dashboard", label: "Dashboard" },
];

function getNavClass({ isActive }) {
  return isActive
    ? "nav-link active"
    : "nav-link";
}

function NavBar() {
  const { user, loading, logout } = useAuth();
  const { pending, error, run } = useAuthAction();

  return (
    <header className="site-header">
      <div className="container nav-container">
        <NavLink to="/" className="logo">
          ProductExplorer
        </NavLink>

        <nav
          className="navigation"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={getNavClass}
            >
              {item.label}
            </NavLink>
          ))}

          {!loading && (
            user ? (
              <>
                <NavLink
                  to="/profile"
                  className={getNavClass}
                >
                  Profile
                </NavLink>

                <button
                  type="button"
                  className="nav-link nav-logout"
                  disabled={pending}
                  onClick={() => void run(logout)}
                >
                  {pending
                    ? "Signing out..."
                    : "Logout"}
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={getNavClass}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className={getNavClass}
                >
                  Sign Up
                </NavLink>
              </>
            )
          )}
        </nav>
      </div>

      {error && (
        <div
          className="container auth-error"
          role="alert"
        >
          {error}
        </div>
      )}
    </header>
  );
}

export default NavBar;
