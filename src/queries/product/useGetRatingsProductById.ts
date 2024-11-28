import { ApiResponseType, responseWrapper } from "queries/helpers";
import { API_QUERIES } from "queries/keys";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { productApi } from ".";

export function useGetRatingsProductById(
  id: number,
  options?: UseQueryOptions<ApiResponseType<number>, Error, number>,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetRatingsByProductId,
  } = useQuery<ApiResponseType<number>, Error, number>(
    [API_QUERIES.RATINGS, id],
    {
      queryFn: () => {
        return responseWrapper<ApiResponseType<number>>(() =>
          productApi.getRatingById(id),
        );
      },
      select: (data) => data?.result || 0,
      notifyOnChangeProps: ["data", "isFetching"],
      enabled: !!id,
      keepPreviousData: true,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateRatingsByProductId = () =>
    queryClient.invalidateQueries([API_QUERIES.RATINGS, id]);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetRatingsByProductId,
    handleInvalidateRatingsByProductId,
  };
}
