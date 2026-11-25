import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fetchProduct } from "./productThunks";
import { catalogReducer, detailsReducer, stockReducer } from "./productSlices";

const reducer = combineReducers({
  catalog: catalogReducer,
  details: detailsReducer,
  stock: stockReducer,
});

export const store = configureStore({
  reducer: (state, action) => {
    // Both slices must apply the same detail response.
    if (fetchProduct.fulfilled.match(action)) {
      const { arg, requestId } = action.meta;
      if (state.details[arg.id]?.requestId !== requestId) return state;
    }

    return reducer(state, action);
  },
});
