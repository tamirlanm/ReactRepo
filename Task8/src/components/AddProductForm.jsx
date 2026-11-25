import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addLocalProduct } from "../store/localProducts";

export default function AddProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);
    const titleValue = data.get("title");
    const descriptionValue = data.get("description");
    const categoryValue = data.get("category");
    const priceValue = data.get("price");
    const stockValue = data.get("stock");

    if (
        typeof titleValue !== "string" ||
        typeof descriptionValue !== "string" ||
        typeof categoryValue !== "string" ||
        typeof priceValue !== "string" ||
        typeof stockValue !== "string"
    ) {
        setError("Enter a name, description, category, valid price and stock.");
        return;
    }

    const title = titleValue.trim();
    const description = descriptionValue.trim();
    const category = categoryValue.trim().toLowerCase().replace(/\s+/g, "-");
    const price = Number(priceValue);
    const stock = Number(stockValue);

    if (
        !title ||
        !description ||
        !category ||
        !priceValue.trim() ||
        !stockValue.trim() ||
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
        title,
        description,
        category,
        price,
        stock,
        }));
    } catch {
        setError("The product could not be saved in this browser.");
        return;
    }

    const id = product?.id;

    if (typeof id !== "string" || !id) {
        setError("Could not open the new product.");
        return;
    }

    try {
        await navigate(`/products/${id}`, { state: { from: "/products" } });
    } catch {
        setError("The product was saved, but its page could not be opened.");
    }
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