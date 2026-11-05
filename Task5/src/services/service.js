
const API_BASE_URL = "https://dummyjson.com/products";

class ApiError extends Error {
  constructor(status) {
    super(
      status === 404
        ? "Product not found"
        : `API request failed: ${status}`
    );

    this.name = "ApiError";
    this.status = status;
  }
}

async function request(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return response.json();
}

export async function getAllProducts(signal) {
  const data = await request(
    `${API_BASE_URL}?limit=0`,
    signal
  );

  if (!Array.isArray(data.products)) {
    throw new TypeError("Invalid products response");
  }

  return data.products;
}

export async function getProductById(id, signal) {
  return request(`${API_BASE_URL}/${id}`, signal);
}
