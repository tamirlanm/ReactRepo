import { useSelector } from "react-redux";
import { fetchProducts } from "../store/productThunks";
import { selectCatalogRequest, selectProducts } from "../store/selectors";
import { readStatus, useRead } from "./useRead";

export function useProducts() {
  const products = useSelector(selectProducts);
  const entry = useSelector(selectCatalogRequest);
  const refresh = useRead(fetchProducts);

  return { products, ...readStatus(entry), refresh };
}