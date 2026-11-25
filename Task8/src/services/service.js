const API_BASE_URL = "https://dummyjson.com/products";

class ApiError extends Error {
  constructor(status, unavailable = false) {
    super(
      status === 404
        ? "Product not found"
        : `API request failed: ${status}`
    );

    this.name = "ApiError";
    this.status = status;
    this.unavailable = unavailable;
  }
}

async function request(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    if (!options.signal?.aborted && !navigator.onLine) {
      throw new ApiError(503, true);
    }

    throw error;
  }

  const source = response.headers.get("X-PWA-Source");

  if (!response.ok) {
    throw new ApiError(response.status, source === "unavailable");
  }

  return {
    data: await response.json(),
    cached: source === "cache",
  };
}

export async function getAllProducts(signal) {
  const { data, cached } = await request(`${API_BASE_URL}?limit=0`, {
    signal,
    credentials: "omit",
  });

  if (!Array.isArray(data?.products)) {
    throw new TypeError("Invalid products response");
  }

  return { products: data.products, cached };
}

export async function getProductById(id, signal) {
  const { data, cached } = await request(`${API_BASE_URL}/${id}`, {
    signal,
    credentials: "omit",
  });

  if (!data || Number(data.id) !== Number(id)) {
    throw new TypeError("Invalid product response");
  }

  return { product: data, cached };
}

export async function updateProductStock(id, stock, signal) {
  const { data } = await request(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock }),
  });

  return data;
}