import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct, fetchProducts, saveStock } from "./productThunks";
import { idleRequest, trackRead } from "./requests";

const catalogSlice = createSlice({
  name: "catalog",
  initialState: { ids: [], byId: {}, request: { ...idleRequest } },
  reducers: {},
  extraReducers: (builder) => {
    trackRead(builder, fetchProducts, (state) => state.request, (state, payload) => {
      state.ids = payload.products.map((product) => product.id);

      for (const product of payload.products) {
        state.byId[product.id] = product;
      }
    });

    builder.addCase(fetchProduct.fulfilled, (state, { payload }) => {
      state.byId[payload.product.id] = payload.product;
    });
  },
});

const detailsSlice = createSlice({
  name: "details",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    trackRead(builder, fetchProduct, (state, action) => {
      const { id } = action.meta.arg;
      state[id] ??= { ...idleRequest };
      return state[id];
    });
  },
});

const stockSlice = createSlice({
  name: "stock",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveStock.pending, (state, { meta }) => {
        state[meta.arg.id] = { status: "pending" };
      })
      .addCase(saveStock.fulfilled, (state, { meta, payload }) => {
        state[meta.arg.id] = { status: "succeeded", stock: payload.stock };
      })
      .addCase(saveStock.rejected, (state, { meta, payload, error }) => {
        state[meta.arg.id] = {
          status: "failed",
          error: payload ?? { message: error.message },
        };
      });
  },
});

export const catalogReducer = catalogSlice.reducer;
export const detailsReducer = detailsSlice.reducer;
export const stockReducer = stockSlice.reducer;