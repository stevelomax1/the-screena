import { ArrowLeft, Film } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <Film size={52} aria-hidden="true" />

        <p className="eyebrow">Error 404</p>

        <h1>This page is off screen.</h1>

        <p>
          The page you requested does not exist or may have been moved.
        </p>

        <Link className="primary-button" to="/">
          <ArrowLeft size={18} aria-hidden="true" />
          Return to discover
        </Link>
      </div>
    </main>
  );
}

export default NotFound;