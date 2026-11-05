
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { getProductById } from "../services/service";

function DetailLinks({ backTo }) {
  return (
    <div className="button-row">
      <Link
        to={backTo}
        className="button button-secondary"
      >
        ← Back
      </Link>

      <Link to="/products" className="button">
        All Products
      </Link>
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();

  const validId = /^[1-9]\d*$/.test(id ?? "");

  const backTo =
    typeof location.state?.from === "string" &&
    location.state.from.startsWith("/products")
      ? location.state.from
      : "/products";

  const [result, setResult] = useState({
    requestedId: null,
    product: null,
    loading: true,
    error: "",
    notFound: false,
  });

  useEffect(() => {
    if (!validId) {
      return;
    }

    const controller = new AbortController();


    async function loadProduct() {
      try {
        const data = await getProductById(
          id,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setResult({
            requestedId: id,
            product: data,
            loading: false,
            error: "",
            notFound: false,
          });
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setResult({
            requestedId: id,
            product: null,
            loading: false,
            error: err.status === 404 ? "" : err.message,
            notFound: err.status === 404,
          });
        }
      }
    }

    void loadProduct();

    return () => controller.abort();
  }, [id, validId]);

  if (!validId || (result.requestedId === id && result.notFound)) {
    return (
      <section className="section empty-state">
        <h1>Product Not Found</h1>
        <p>This product does not exist.</p>
        <DetailLinks backTo={backTo} />
      </section>
    );
  }

  if (result.requestedId !== id || result.loading) {
    return (
      <div className="status-message">
        Loading product details...
      </div>
    );
  }

  if (result.error) {
    return (
      <section className="section">
        <div className="error-message" role="alert">
          Failed to load product: {result.error}
        </div>
        <DetailLinks backTo={backTo} />
      </section>
    );
  }

  const product = result.product;

  const details = [
    ["Brand", product.brand || "Not specified"],
    ["Category", product.category],
    ["SKU", product.sku || "Not specified"],
    ["Price", `$${Number(product.price).toFixed(2)}`],
    ["Discount", `${product.discountPercentage ?? 0}%`],
    ["Rating", `${product.rating ?? "N/A"} / 5`],
    ["Stock", product.stock ?? "N/A"],
    [
      "Availability",
      product.availabilityStatus ||
        (product.stock > 0 ? "In Stock" : "Out of Stock"),
    ],
    ["Warranty", product.warrantyInformation || "Not specified"],
    ["Shipping", product.shippingInformation || "Not specified"],
    ["Weight", product.weight ?? "Not specified"],
  ];

  return (
    <section className="section">
      <DetailLinks backTo={backTo} />

      <div className="details-layout">
        <div className="details-image-wrapper">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="details-image"
          />
        </div>

        <div className="details-content">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <h2>Product Information</h2>

          <dl className="details-list">
            {details.map(([label, value]) => (
              <div key={label} className="detail-row">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          {product.tags?.length > 0 && (
            <div className="tags">
              {product.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
