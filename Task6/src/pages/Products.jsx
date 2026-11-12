
import { useSearchParams, useLocation } from "react-router";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const PRODUCTS_PER_PAGE = 12;

function Products() {
  const {
    products,
    loading,
    error,
    isFetching,
    refresh,
  } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const search = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";

  const ratingParam = searchParams.get("rating") || "0";
  const rating = ["0", "3", "4", "4.5"].includes(ratingParam)
    ? Number(ratingParam)
    : 0;

  const sort = searchParams.get("sort") || "title-asc";

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);

    const defaults = {
      category: "all",
      rating: "0",
      sort: "title-asc",
      page: "1",
    };

    if (!value || value === defaults[key]) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key !== "page") {
      next.delete("page");
    }

    setSearchParams(next, {
      replace: key === "q",
    });
  }

  if (loading) {
    return (
      <div className="status-message">
        Loading products...
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="error-message" role="alert">
        <p>Failed to load products: {error}</p>

        <button
          type="button"
          className="button button-secondary"
          disabled={isFetching}
          onClick={() => void refresh()}
        >
          {isFetching ? "Retrying..." : "Try Again"}
        </button>
      </div>
    );
  }


  const categories = [
  ...new Set(products.map((product) => product.category)),
    ].sort((a, b) => a.localeCompare(b));

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    const matchesCategory =
      category === "all" || product.category === category;

    const matchesRating = product.rating >= rating;

    return matchesSearch && matchesCategory && matchesRating;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "rating-desc":
        return b.rating - a.rating;

      default:
        return a.title.localeCompare(b.title);
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)
  );

  const requestedPage = Number(
    searchParams.get("page") || "1"
  );

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const currentUrl = location.pathname + location.search;

  return (
    <section className="section">
      <div className="page-heading">
        <h1>Product Catalog</h1>
        <p>
          Search, filter and sort products from the API.
        </p>
      </div>

      <div className="filters">
        
        <label className="form-field">
        <span>Search</span>
        <input
            type="search"
            value={search}
            placeholder="Search products..."
            onChange={(event) =>
            updateParam("q", event.target.value)
            }
        />
        </label>

        <label className="form-field">
        <span>Category</span>
        <select
            value={category}
            onChange={(event) =>
            updateParam("category", event.target.value)
            }
        >
            <option value="all">All Categories</option>

            {categories.map((item) => (
            <option key={item} value={item}>
                {item}
            </option>
            ))}
        </select>
        </label>

        <label className="form-field">
        <span>Minimum Rating</span>
        <select
            value={String(rating)}
            onChange={(event) =>
            updateParam("rating", event.target.value)
            }
        >
            <option value="0">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
        </select>
        </label>

        <label className="form-field">
        <span>Sort By</span>
        <select
            value={
            ["price-asc", "price-desc", "rating-desc"].includes(sort)
                ? sort
                : "title-asc"
            }
            onChange={(event) =>
            updateParam("sort", event.target.value)
            }
        >
            <option value="title-asc">Name: A-Z</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
        </select>
        </label>

      </div>

      
      <div className="results-row">
        <p>{filteredProducts.length} products found</p>

        <div className="results-actions">
          <button
            type="button"
            className="text-button"
            disabled={isFetching}
            onClick={() => void refresh()}
          >
            {isFetching ? "Refreshing..." : "Refresh Data"}
          </button>

          <button
            type="button"
            className="text-button"
            onClick={() => setSearchParams({})}
          >
            Reset Filters
          </button>
        </div>
      </div>


      {visibleProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              from={currentUrl}
            />
          ))}
        </div>
      )}

      {filteredProducts.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="button button-secondary"
            disabled={currentPage === 1}
            onClick={() =>
              updateParam("page", String(currentPage - 1))
            }
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            className="button button-secondary"
            disabled={currentPage === totalPages}
            onClick={() =>
              updateParam("page", String(currentPage + 1))
            }
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default Products;
