import { LoginKey,UserKey } from "./keys";


export type Auth = {
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  [LoginKey.USERNAME]: string;
  [LoginKey.PASSWORD]: string;
};

export type AddUserPayload = {
  [UserKey.USERNAME]: string;
  [UserKey.PASSWORD]: string;
  [UserKey.FIRSTNAME]: string;
  [UserKey.LASTNAME]: string;
  [UserKey.EMAIL]: string;
  [UserKey.PHONENUMBER]: string;
  [UserKey.GENDER]: string;
  [UserKey.DATEOFBIRTH]: Date;
  [UserKey.ADDRESS]: string;
  [UserKey.STATUS]: string;

};



export type RefreshTokenPayload = {
  token: string;
};
