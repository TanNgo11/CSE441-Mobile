import { VITE_BASE_URL } from "@env";
import useHttpPublicRequest from "@services/httpRequest/useHttpPublicRequest ";

const useApi = (baseURL = VITE_BASE_URL) => {
  const publicApi = useHttpPublicRequest(baseURL);
  // const privateApi = useHttpPrivateRequest(baseURL);

  const getListProducts = () => {
    return publicApi.get("/api/v1/products", {});
  };

  const getProductById = (id: number) => {
    return publicApi.get(`/api/v1/products/${id}`, {});
  };

  const getListProductsByIds = (ids: number[]) => {
    return publicApi.get("/api/v1/products/list", {
      params: { ids: ids.join(",") },
    });
  };

  const getRatingById = (id: number) => {
    return publicApi.get(`/api/v1/ratings/average/${id}`, {});
  };
  return {
    getListProducts,
    getProductById,
    getRatingById,
    getListProductsByIds,
  };
};

export default useApi;
