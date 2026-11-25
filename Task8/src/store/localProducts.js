import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "product-explorer-task8-local-products-v1";
const emptyState = { created: {}, deleted: {} };

function loadLocalProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      created: saved?.created ?? {},
      deleted: saved?.deleted ?? {},
    };
  } catch {
    return emptyState;
  }
}

const localProductsSlice = createSlice({
  name: "localProducts",
  initialState: loadLocalProducts(),
  reducers: {
    replaceLocalProducts: (_, action) => action.payload,
  },
});

export const localProductsReducer = localProductsSlice.reducer;

function commitLocalProducts(next, dispatch) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  dispatch(localProductsSlice.actions.replaceLocalProducts(next));
}

export const addLocalProduct = (fields) => (dispatch, getState) => {
  const current = getState().localProducts;
  const product = {
    ...fields,
    id: `local-${crypto.randomUUID()}`,
    rating: 0,
    thumbnail: `${import.meta.env.BASE_URL}icon-192.png`,
  };

  commitLocalProducts({
    ...current,
    created: { ...current.created, [product.id]: product },
  }, dispatch);

  return product;
};

export const deleteCatalogProduct = (id) => (dispatch, getState) => {
  const current = getState().localProducts;
  const created = { ...current.created };
  const deleted = { ...current.deleted };

  if (Object.hasOwn(created, id)) {
    delete created[id];
  } else {
    deleted[id] = true;
  }

  commitLocalProducts({ created, deleted }, dispatch);
};

export const updateLocalStock = (id, stock) => (dispatch, getState) => {
  const current = getState().localProducts;
  const product = current.created[id];

  if (!product) throw new Error("Product not found.");

  commitLocalProducts({
    ...current,
    created: {
      ...current.created,
      [id]: { ...product, stock },
    },
  }, dispatch);
};