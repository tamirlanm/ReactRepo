
import { CachedData, OfflineData } from "../components/PwaStatus";
import { useSearchParams, useLocation } from "react-router";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useSelector } from "react-redux";
import { selectCatalogPage, selectCategories } from "../store/selectors";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import AddProductForm from "../components/AddProductForm";


function Products() {
  const {
    loading,
    error,
    cached,
    unavailable,
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

  const sortParam = searchParams.get("sort");
  const sort = ["price-asc", "price-desc", "rating-desc"].includes(sortParam)
    ? sortParam
    : "title-asc";

  const debouncedSearch = useDebouncedValue(search);
  const page = Number(searchParams.get("page") || "1");
  const categories = useSelector(selectCategories);

  const { count, currentPage, totalPages, visibleProducts } = useSelector(
    (state) => selectCatalogPage(state, {
      search: debouncedSearch,
      category,
      rating,
      sort,
      page,
    })
  );

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

  if (unavailable) {
  return (
    <OfflineData
      onRetry={() => void refresh()}
      retrying={isFetching}
    />
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


  const currentUrl = location.pathname + location.search;

  return (
    <section className="section">
      <div className="page-heading">
        <h1>Product Catalog</h1>
        <p>
          Search, filter and sort products from the API.
        </p>
      </div>

      <CachedData cached={cached} />
      <AddProductForm />
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
            value={sort}
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
        <p>{count} products found</p>

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

      {count > 0 && totalPages > 1 && (
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
