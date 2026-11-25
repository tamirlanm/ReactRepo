import { createSelector } from "@reduxjs/toolkit";
import { idleRequest } from "./requests";

const PRODUCTS_PER_PAGE = 12;

export const selectCatalogRequest = (state) => state.catalog.request;
export const selectDetailRequest = (state, id) => state.details[id] ?? idleRequest;
export const selectProduct = (state, id) => state.catalog.byId[id];
export const selectStockRequest = (state, id) => state.stock[id] ?? idleRequest;

export const selectProducts = createSelector(
  [(state) => state.catalog.ids, (state) => state.catalog.byId],
  (ids, byId) => ids.map((id) => byId[id])
);

export const selectCategories = createSelector([selectProducts], (products) =>
  [...new Set(products.map((product) => product.category))]
    .sort((a, b) => a.localeCompare(b))
);

const compare = {
  "title-asc": (a, b) => a.title.localeCompare(b.title),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "rating-desc": (a, b) => b.rating - a.rating,
};

const selectFilteredProducts = createSelector(
  [
    selectProducts,
    (_, options) => options.search,
    (_, options) => options.category,
    (_, options) => options.rating,
    (_, options) => options.sort,
  ],
  (products, search, category, rating, sort) => {
    const query = search.trim().toLowerCase();

    return products
      .filter((product) =>
        (product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)) &&
        (category === "all" || product.category === category) &&
        product.rating >= rating
      )
      .sort(compare[sort]);
  }
);

export const selectCatalogPage = createSelector(
  [selectFilteredProducts, (_, options) => options.page],
  (products, page) => {
    const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));
    const currentPage = Number.isInteger(page) && page > 0
      ? Math.min(page, totalPages)
      : 1;
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;

    return {
      count: products.length,
      currentPage,
      totalPages,
      visibleProducts: products.slice(start, start + PRODUCTS_PER_PAGE),
    };
  }
);