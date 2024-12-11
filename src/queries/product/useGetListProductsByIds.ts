import { ApiResponseListType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { ProductResponseType } from "queries/product/types";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { productApi } from ".";

export function useGetListProductsByIds(
  ids: number[],
  options?: UseQueryOptions<
    ApiResponseListType<ProductResponseType>,
    Error,
    ProductResponseType[]
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetListProductsByIds,
  } = useQuery<
    ApiResponseListType<ProductResponseType>,
    Error,
    ProductResponseType[]
  >([API_QUERIES.PRODUCTS, ids], {
    queryFn: () => {
      return responseWrapper<ApiResponseListType<ProductResponseType>>(() =>
        productApi.getListProductsByIds(ids),
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateListProductByIds = () =>
    queryClient.invalidateQueries([API_QUERIES.PRODUCTS, ids]);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetListProductsByIds,
    handleInvalidateListProductByIds,
  };
}
