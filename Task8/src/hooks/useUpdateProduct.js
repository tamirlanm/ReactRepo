import { useDispatch, useSelector } from "react-redux";
import { saveStock } from "../store/productThunks";
import { selectStockRequest } from "../store/selectors";

export function useUpdateProduct(id) {
  const dispatch = useDispatch();
  const entry = useSelector((state) => selectStockRequest(state, id));

  return {
    mutate: (input) => dispatch(saveStock(input)),
    isPending: entry.status === "pending",
    isError: entry.status === "failed",
    isSuccess: entry.status === "succeeded",
    error: entry.error,
    data: entry,
  };
}