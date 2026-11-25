export const idleRequest = {
  status: "idle",
  requestId: null,
  loadedAt: 0,
  cached: false,
  error: null,
};

export function shouldRead(entry, { force, replace } = {}) {
  if (replace) return true;
  if (entry?.status === "pending") return false;

  return force || !entry?.loadedAt || Date.now() - entry.loadedAt >= 120_000;
}

export function apiError(error) {
  return {
    message: error.message || "Request failed.",
    status: error.status ?? null,
    unavailable: error.unavailable === true,
  };
}

export function trackRead(builder, thunk, getEntry, saveData) {
  builder
    .addCase(thunk.pending, (state, action) => {
      const entry = getEntry(state, action);
      entry.status = "pending";
      entry.requestId = action.meta.requestId;
      entry.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      const entry = getEntry(state, action);
      if (entry.requestId !== action.meta.requestId) return;

      entry.status = "succeeded";
      entry.loadedAt = action.payload.loadedAt;
      entry.cached = action.payload.cached;
      saveData?.(state, action.payload);
    })
    .addCase(thunk.rejected, (state, action) => {
      const entry = getEntry(state, action);
      if (entry.requestId !== action.meta.requestId) return;

      entry.status = "failed";
      entry.error = action.payload ?? { message: action.error.message };
    });
}