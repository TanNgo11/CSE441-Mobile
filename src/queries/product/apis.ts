import { VITE_BASE_URL } from "@env";
import useHttpPublicRequest from "@services/httpRequest/useHttpPublicRequest ";

const useApi = (baseURL = VITE_BASE_URL) => {
  const publicApi = useHttpPublicRequest(baseURL);
  // const privateApi = useHttpPrivateRequest(baseURL);

  const getListProducts = () => {
    return publicApi.get("/api/v1/products", {});
  };

  return {
    getListProducts,
  };
};

export default useApi;
