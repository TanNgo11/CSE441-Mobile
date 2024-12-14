import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "@services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "@services/httpRequest/useHttpPublicRequest ";
import { Order } from "./type";

const useApi = (baseURL = VITE_BASE_URL) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const createOrder = (payload: Order) => {
    return privateApi.post("/api/v1/orders", payload);
  };

  return { createOrder };
};

export default useApi;
