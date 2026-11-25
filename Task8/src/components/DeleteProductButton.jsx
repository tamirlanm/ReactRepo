import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteCatalogProduct } from "../store/localProducts";

export default function DeleteProductButton({ product, backTo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!window.confirm(`Delete "${product.title}" from this browser's catalog?`)) {
        return;
    }

    setError("");

    try {
        dispatch(deleteCatalogProduct(product.id));
    } catch {
        setError("The deletion could not be saved in this browser.");
        return;
    }

    try {
        await navigate(backTo, { replace: true });
    } catch {
        setError("The product was deleted, but the catalog could not be opened.");
    }
    }

  return (
    <div className="button-row">
      <button
        className="button button-secondary"
        type="button"
        onClick={handleDelete}
      >
        Delete Product
      </button>

      {error && <p className="auth-error" role="alert">{error}</p>}
    </div>
  );
}