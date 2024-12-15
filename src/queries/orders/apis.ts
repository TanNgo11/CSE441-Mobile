import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "@services/httpRequest/useHttpPrivateRequest";

const useApi = (baseURL = VITE_BASE_URL) => {
//   const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const getListOrders = () => {
    return privateApi.get("/api/v1/orders?page=0&size=52", {});
  };

  return {
    getListOrders,
  };
};

export default useApi;
