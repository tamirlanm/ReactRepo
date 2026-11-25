import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useRead(thunk, id, enabled = true) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled) return;

    void dispatch(thunk({ id }));

    const reconnect = () => void dispatch(thunk({ id, force: true }));
    window.addEventListener("online", reconnect);
    return () => window.removeEventListener("online", reconnect);
  }, [dispatch, enabled, id, thunk]);

  return () => dispatch(thunk({ id, force: true }));
}

export function readStatus(entry) {
  const error = entry.loadedAt ? null : entry.error;

  return {
    cached: entry.cached,
    unavailable: error?.unavailable === true,
    loading: !entry.loadedAt && ["idle", "pending"].includes(entry.status) && !error,
    error: error?.message || "",
    isFetching: entry.status === "pending",
  };
}