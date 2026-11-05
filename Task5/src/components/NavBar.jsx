
import { NavLink } from "react-router";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/login", label: "Login" },
];

function NavBar() {
  return (
    <header className="site-header">
      <div className="container nav-container">
        <NavLink to="/" className="logo">
          ProductExplorer
        </NavLink>

        <nav className="navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
