import { Film } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <Link to="/" className="footer-logo">
          <Film size={24} aria-hidden="true" />
          <span>Screena</span>
        </Link>

        <p>
          Discover movies and television shows using data provided by TMDB.
        </p>

        <p className="footer-copyright">
          © {currentYear} Screena
        </p>
      </div>
    </footer>
  );
}

export default Footer;