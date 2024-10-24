import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "@services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "@services/httpRequest/useHttpPublicRequest ";
import { LoginPayload } from "./types";

const useApi = (baseURL = VITE_BASE_URL) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const authenticate = (payload: LoginPayload) => {
    return publicApi.post("/api/v1/auth/token", payload);
  };

  const getUserInfo = () => {
    return privateApi.get("/api/v1/users/myInfo");
  };

  const getRefreshToken = () => {
    return publicApi.post("/api/v1/auth/refresh");
  };

  return {
    authenticate,
    getUserInfo,
    getRefreshToken,
  };
};

export default useApi;
