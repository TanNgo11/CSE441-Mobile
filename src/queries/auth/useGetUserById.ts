import { ApiResponseType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { User } from "zustand/auth/types";
import { authApi } from ".";

export function useGetUserById(
  id: number,
  options?: UseQueryOptions<
    ApiResponseType<User>,
    Error,
    User
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetUserById,
  } = useQuery<
    ApiResponseType<User>,
    Error,
    User
  >([API_QUERIES.USER, id], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<User>>(() =>
        authApi.getUserById(id),
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !!id,
    keepPreviousData: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateUserById = () =>
    queryClient.invalidateQueries([API_QUERIES.USER, id]);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserById,
    handleInvalidateUserById,
  };
}
