
import { useState } from "react";
import {
  useUpdateProduct,
} from "../hooks/useUpdateProduct";

function StockEditor({ product }) {
  const [stock, setStock] = useState(
    String(product.stock)
  );

  const [validationError, setValidationError] =
    useState("");

  const mutation = useUpdateProduct();

  function handleSubmit(event) {
    event.preventDefault();

    setValidationError("");

    const nextStock = Number(stock);

    if (
      stock.trim() === "" ||
      !Number.isSafeInteger(nextStock) ||
      nextStock < 0
    ) {
      setValidationError(
        "Enter a valid non-negative integer."
      );

      return;
    }

    mutation.mutate({
      id: product.id,
      stock: nextStock,
    });
  }

  return (
    <div className="content-card stock-editor">
      <h2>Update Stock (Demo)</h2>

      <p className="muted">
        DummyJSON simulates updates without
        permanently saving them.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="form-field">
          <span>New Stock</span>

          <input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) =>
              setStock(event.target.value)
            }
            required
            disabled={mutation.isPending}
          />
        </label>

        <button
          type="submit"
          className="button"
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Updating..."
            : "Update Stock"}
        </button>
      </form>

      {validationError && (
        <div className="auth-error" role="alert">
          {validationError}
        </div>
      )}

      {mutation.isError && (
        <div className="auth-error" role="alert">
          {mutation.error.message}
        </div>
      )}

      {mutation.isSuccess && (
        <output className="success-message">
          Update simulated successfully.
          Returned stock: {mutation.data.stock}.
          Product cache has been invalidated.
        </output>
      )}
    </div>
  );
}

export default StockEditor;
