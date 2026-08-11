import { Heart } from "lucide-react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
  <Logo size={38} />
</NavLink>

        <nav className="navbar-links" aria-label="Main navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Discover
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            <Heart size={18} aria-hidden="true" />
            <span>Favorites</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;