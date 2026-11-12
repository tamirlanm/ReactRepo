
import { Link } from "react-router";

function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for
        does not exist.
      </p>

      <Link to="/" className="button">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
