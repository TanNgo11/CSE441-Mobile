import { ApiResponseListType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { productApi } from ".";
import { ProductResponseType } from "./types";

export function useGetListProducts(
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
    refetch: onGetUserInfo,
  } = useQuery<
    ApiResponseListType<ProductResponseType>,
    Error,
    ProductResponseType[]
  >([API_QUERIES.PRODUCT], {
    queryFn: () => {
      return responseWrapper<ApiResponseListType<ProductResponseType>>(
        productApi.getListProducts,
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateListProduct = () =>
    queryClient.invalidateQueries(API_QUERIES.PRODUCT);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserInfo,
    handleInvalidateListProduct,
  };
}
