import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "@services/httpRequest/useHttpPrivateRequest";

const useApi = (baseURL = VITE_BASE_URL) => {
//   const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const getListOrders = () => {
    return privateApi.get("/api/v1/orders", {});
  };
  const AddUser = () => {
    return privateApi.post("/api/v1/users", {});
  };
  

  return {
    getListOrders,
  };
};

export default useApi;
