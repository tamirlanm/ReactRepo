import { useSelector } from "react-redux";
import { fetchProduct } from "../store/productThunks";
import {
  selectDetailRequest,
  selectProduct,
  selectProductDeleted,
} from "../store/selectors";
import { readStatus, useRead } from "./useRead";

export function useProduct(id) {
  const remoteId = /^[1-9]\d*$/.test(id ?? "");
  const deleted = useSelector((state) => selectProductDeleted(state, id));
  const entry = useSelector((state) => selectDetailRequest(state, id));
  const product = useSelector((state) => selectProduct(state, id));
  const refresh = useRead(fetchProduct, id, remoteId && !deleted);

  if (!remoteId || deleted) {
    return {
      product,
      loading: false,
      cached: false,
      unavailable: false,
      isFetching: false,
      error: "",
      notFound: deleted || !product,
      refresh,
    };
  }

  return {
    product,
    ...readStatus(entry),
    notFound: entry.error?.status === 404,
    refresh,
  };
}