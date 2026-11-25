import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductById,
  updateProductStock,
} from "../services/service";
import { apiError, shouldRead } from "./requests";
import { updateLocalStock } from "./localProducts";

export const fetchProducts = createAsyncThunk(
  "catalog/fetch",
  async (_, { signal, rejectWithValue }) => {
    try {
      const result = await getAllProducts(signal);
      return { ...result, loadedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },
  {
    condition: (options, { getState }) =>
      shouldRead(getState().catalog.request, options),
  }
);

export const fetchProduct = createAsyncThunk(
  "details/fetch",
  async ({ id }, { signal, rejectWithValue }) => {
    try {
      const result = await getProductById(id, signal);
      return { ...result, loadedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },
  {
    condition: (options, { getState }) =>
      /^[1-9]\d*$/.test(options.id) &&
      shouldRead(getState().details[options.id], options),
  }
);

export const saveStock = createAsyncThunk(
  "stock/update",
  async ({ id, stock }, { dispatch, signal, rejectWithValue }) => {
    let result;

    try {
      if (String(id).startsWith("local-")) {
        dispatch(updateLocalStock(id, stock));
        return { stock };
      }
      result = await updateProductStock(id, stock, signal);
    } catch (error) {
      return rejectWithValue(apiError(error));
    }

    await Promise.all([
      dispatch(fetchProducts({ replace: true })),
      dispatch(fetchProduct({ id, replace: true })),
    ]);

    return { stock: result.stock };
  },
  {
    condition: ({ id }, { getState }) =>
      getState().stock[id]?.status !== "pending",
  }
);