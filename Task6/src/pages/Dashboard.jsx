
import { useState } from "react";
import { Link } from "react-router";
import { useProducts } from "../hooks/useProducts";

function Dashboard() {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (loading) {
    return (
      <div className="status-message">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message" role="alert">
        Failed to load dashboard: {error}
      </div>
    );
  }

    const categories = [
    ...new Set(products.map((product) => product.category)),
    ].sort((a, b) => a.localeCompare(b));

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const totalProducts = filteredProducts.length;

  const totalPrice = filteredProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const totalRating = filteredProducts.reduce(
    (sum, product) => sum + product.rating,
    0
  );

  const totalStock = filteredProducts.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const averagePrice =
    totalProducts > 0 ? totalPrice / totalProducts : 0;

  const averageRating =
    totalProducts > 0 ? totalRating / totalProducts : 0;

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
    },
    {
      label: "Average Price",
      value: `$${averagePrice.toFixed(2)}`,
    },
    {
      label: "Average Rating",
      value: `${averageRating.toFixed(2)} / 5`,
    },
    {
      label: "Total Stock",
      value: totalStock,
    },
  ];

  const categoryBreakdown = Object.entries(
    filteredProducts.reduce((result, product) => {
      result[product.category] =
        (result[product.category] || 0) + 1;

      return result;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  const priceBreakdown = [
    {
      label: "Under $50",
      count: filteredProducts.filter(
        (product) => product.price < 50
      ).length,
    },
    {
      label: "$50 - $199.99",
      count: filteredProducts.filter(
        (product) =>
          product.price >= 50 && product.price < 200
      ).length,
    },
    {
      label: "$200 and above",
      count: filteredProducts.filter(
        (product) => product.price >= 200
      ).length,
    },
  ];

  return (
    <section className="section">
      <div className="page-heading">
        <h1>Dashboard</h1>
        <p>
          Statistics calculated from real API data.
        </p>
      </div>

      <div className="dashboard-toolbar">
        
        <label className="form-field">
        <span>Filter by Category</span>

        <select
            value={selectedCategory}
            onChange={(event) =>
            setSelectedCategory(event.target.value)
            }
        >
            <option value="all">All Categories</option>

            {categories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
            ))}
        </select>
        </label>


        <Link to="/products" className="button">
          Browse All Products
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>

      <div className="breakdown-grid">
        <div className="content-card">
          <h2>Products by Category</h2>

          {categoryBreakdown.length === 0 ? (
            <p>No category data available.</p>
          ) : (
            categoryBreakdown.map(([name, count]) => (
              <div key={name} className="breakdown-item">
                <div className="breakdown-header">
                  <Link
                    to={`/products?category=${encodeURIComponent(name)}`}
                  >
                    {name}
                  </Link>

                  <strong>{count}</strong>
                </div>

                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${
                        totalProducts > 0
                          ? (count / totalProducts) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="content-card">
          <h2>Products by Price Range</h2>

          {priceBreakdown.map((item) => (
            <div key={item.label} className="breakdown-item">
              <div className="breakdown-header">
                <span>{item.label}</span>
                <strong>{item.count}</strong>
              </div>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${
                      totalProducts > 0
                        ? (item.count / totalProducts) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
