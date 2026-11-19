
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateProductStock,
} from "../services/service";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stock }) =>
      updateProductStock(id, stock),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
