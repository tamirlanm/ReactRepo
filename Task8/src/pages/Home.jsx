import { Link } from "react-router";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            React Routing Project
          </span>

          <h1>Discover products in one place</h1>

          <p>
            Explore products from a real API.
            Search, filter, sort and discover
            useful product information.
          </p>

          <div className="button-row">
            <Link to="/products" className="button">
              Explore Products
            </Link>

            <Link
              to="/about"
              className="button button-secondary"
            >
              About Project
            </Link>
          </div>
        </div>

        <img
          className="hero-image"
          src={`${import.meta.env.BASE_URL}hero.svg`}
          alt="Illustration of a product catalog"
        />
      </section>

      <section className="section">
        <h2>Application Features</h2>

        <div className="feature-grid">
          <article className="feature-card">
            <h3>Product Catalog</h3>
            <p>
              Browse products with search,
              filtering and sorting.
            </p>
          </article>

          <article className="feature-card">
            <h3>Product Details</h3>
            <p>
              View product specifications,
              ratings and availability.
            </p>
          </article>

          <article className="feature-card">
            <h3>Dashboard</h3>
            <p>
              Explore statistics based on
              real product data.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;
