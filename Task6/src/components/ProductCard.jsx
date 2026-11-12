
import { Link } from "react-router";

function ProductCard({ product, from }) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.title}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-meta">
          <strong>${Number(product.price).toFixed(2)}</strong>
          <span>★ {product.rating}</span>
        </div>

        <Link
          to={`/products/${product.id}`}
          state={{ from }}
          className="button product-button"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
