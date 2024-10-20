import { LoginKey } from "./keys";

export type Auth = {
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  [LoginKey.USERNAME]: string;
  [LoginKey.PASSWORD]: string;
};

export type RefreshTokenPayload = {
  token: string;
};
