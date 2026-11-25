import { useSelector } from "react-redux";
import { fetchProduct } from "../store/productThunks";
import { selectDetailRequest, selectProduct } from "../store/selectors";
import { readStatus, useRead } from "./useRead";

export function useProduct(id) {
  const valid = /^[1-9]\d*$/.test(id ?? "");
  const entry = useSelector((state) => selectDetailRequest(state, id));
  const product = useSelector((state) => selectProduct(state, id));
  const refresh = useRead(fetchProduct, id, valid);

  return {
    product,
    ...readStatus(entry),
    notFound: !valid || entry.error?.status === 404,
    refresh,
  };
}