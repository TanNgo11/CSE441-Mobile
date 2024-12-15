import {  ApiResponseType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { OrderDataType } from "./types";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ordersApi } from ".";

export function useGetListOrders(
  options?: UseQueryOptions<
    ApiResponseType<OrderDataType>,
    Error,
    OrderDataType
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetListOrder,
  } = useQuery<
    ApiResponseType<OrderDataType>,
    Error,
    OrderDataType
  >([API_QUERIES.ORDERS], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<OrderDataType>>(
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
    onGetListOrder,
    handleInvalidateListOrder,
  };
}
