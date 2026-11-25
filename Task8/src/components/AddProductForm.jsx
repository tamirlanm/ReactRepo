import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addLocalProduct } from "../store/localProducts";

export default function AddProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);
    const title = String(data.get("title")).trim();
    const description = String(data.get("description")).trim();
    const category = String(data.get("category")).trim().toLowerCase()
      .replace(/\s+/g, "-");
    const price = Number(data.get("price"));
    const stock = Number(data.get("stock"));

    if (
      !title ||
      !description ||
      !category ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isSafeInteger(stock) ||
      stock < 0
    ) {
      setError("Enter a name, description, category, valid price and stock.");
      return;
    }

    let product;

    try {
      product = dispatch(addLocalProduct({
        title, description, category, price, stock,
      }));
    } catch {
      setError("The product could not be saved in this browser.");
      return;
    }

    navigate(`/products/${product.id}`, { state: { from: "/products" } });
  }

  return (
    <details className="content-card">
      <summary>Add Product</summary>

      <form onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Name</span>
          <input name="title" maxLength={80} required />
        </label>

        <label className="form-field">
          <span>Description</span>
          <textarea name="description" maxLength={500} required />
        </label>

        <label className="form-field">
          <span>Category</span>
          <input name="category" maxLength={50} required />
        </label>

        <label className="form-field">
          <span>Price</span>
          <input name="price" type="number" min="0" step="0.01" required />
        </label>

        <label className="form-field">
          <span>Stock</span>
          <input name="stock" type="number" min="0" step="1" required />
        </label>

        <button className="button" type="submit">Create Product</button>
        {error && <p className="auth-error" role="alert">{error}</p>}
      </form>
    </details>
  );
}