
import { useQuery } from "@tanstack/react-query";

import {
  getProductById,
} from "../services/service";

export function useProduct(id) {
  const validId = /^[1-9]\d*$/.test(id ?? "");

  const query = useQuery({
    queryKey: ["products", "detail", id],

    queryFn: ({ signal }) =>
      getProductById(id, signal),

    enabled: validId,

    retry: (failureCount, error) =>
      error.status !== 404 &&
      failureCount < 1,
  });

  return {
    product: query.data,
    loading: query.isPending,

    error: query.error?.message || "",

    notFound:
      !validId ||
      query.error?.status === 404,
  };
}
