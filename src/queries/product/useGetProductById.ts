import { ApiResponseType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { productApi } from ".";
import { ProductResponseType } from "./types";

export function useGetProductById(
  id: number,
  options?: UseQueryOptions<
    ApiResponseType<ProductResponseType>,
    Error,
    ProductResponseType
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetProductById,
  } = useQuery<
    ApiResponseType<ProductResponseType>,
    Error,
    ProductResponseType
  >([API_QUERIES.PRODUCT, id], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<ProductResponseType>>(() =>
        productApi.getProductById(id),
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !!id,
    keepPreviousData: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProductById = () =>
    queryClient.invalidateQueries([API_QUERIES.PRODUCT, id]);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetProductById,
    handleInvalidateProductById,
  };
}
