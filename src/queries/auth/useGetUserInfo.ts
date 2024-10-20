import { ApiResponseType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { User } from "zustand/auth/types";
import { authApi } from ".";

export function useGetUserInfo(
  options?: UseQueryOptions<ApiResponseType<User>, Error, User>,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetUserInfo,
  } = useQuery<ApiResponseType<User>, Error, User>([API_QUERIES.USER], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<User>>(authApi.getUserInfo);
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateUserInfo = () =>
    queryClient.invalidateQueries(API_QUERIES.USER);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserInfo,
    handleInvalidateUserInfo,
  };
}
