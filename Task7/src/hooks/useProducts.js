
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getAllProducts } from "../services/service";

export function useProducts() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products", "list"],

    queryFn: ({ signal }) =>
      getAllProducts(signal),
  });

  function refresh() {
    return queryClient.invalidateQueries({
      queryKey: ["products", "list"],
      exact: true,
    });
  }

    return {
      products: query.data?.products ?? [],
      cached: query.data?.cached ?? false,
      unavailable: !query.data && query.error?.unavailable === true,
      loading: query.isPending,
      error: query.data ? "" : query.error?.message || "",
      isFetching: query.isFetching,
      refresh,
  };
}
