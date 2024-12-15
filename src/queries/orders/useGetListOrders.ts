import { ApiResponseListType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { OrderResponseType } from "./types";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ordersApi } from ".";

export function useGetListOrders(
  options?: UseQueryOptions<
    ApiResponseListType<OrderResponseType>,
    Error,
    OrderResponseType[]
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetOrder,
  } = useQuery<
    ApiResponseListType<OrderResponseType>,
    Error,
    OrderResponseType[]
  >([API_QUERIES.PRODUCT], {
    queryFn: () => {
      return responseWrapper<ApiResponseListType<OrderResponseType>>(
        ordersApi.getListOrders,
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateListOrder = () =>
    queryClient.invalidateQueries(API_QUERIES.ORDERS);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserInfo: onGetOrder,
    handleInvalidateListOrder: handleInvalidateListOrder,
  };
}
