import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
       <Link to="/" className="footer-logo">
  <Logo size={30} />
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