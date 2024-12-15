import { ApiResponseListType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { User } from "zustand/auth/types";
import { authApi } from ".";

export function useGetListUsers(
    options?: UseQueryOptions<
        ApiResponseListType<User>,
        Error,
        User[]
    >
) {
    const {
        data,
        error,
        isError,
        isFetching,
        refetch: onGetListUser,
    } = useQuery<
        ApiResponseListType<User>,
        Error,
        User[]
        >([API_QUERIES.USER], {
            queryFn: () => {
                return responseWrapper<ApiResponseListType<User>>(
                    authApi.getListUser
                );
            },
            select: (data) => data?.result || {},
            notifyOnChangeProps: ["data", "isFetching"],
            keepPreviousData: true,
            ...options,
        });
    const queryClient = useQueryClient();

    const handleInvalidatezlistUser = () =>
        queryClient.invalidateQueries(API_QUERIES.USER);

    return {
        data,
        error,
        isError,
        isFetching,
        onGetListUser,
        handleInvalidatezlistUser,
    };
}
