import axios from "axios";
import { QUIZ_API_URL } from "../../constants/index";
import { jwtConfig } from "./jwtDefaultConfig";
import jwt from "jsonwebtoken";

export const authService = {
  refreshToken: async () => {
    const apiUrl = `${QUIZ_API_URL}/auth/refresh-token`;
    const payload = jwt.decode(
      localStorage.getItem(jwtConfig.storageTokenKeyName)
    );

    const refreshTokenApi = axios.create({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(jwtConfig.refreshToken)}`,
        // Authorization: process.env.REACT_APP_TOKEN
      },
    });

    const data = {
      userId: payload.id,
      refreshToken: localStorage.getItem(jwtConfig.refreshToken),
    };

    return refreshTokenApi.get(apiUrl, data);
  },
  setLocalStorageWhenLogin: (payload) => {
    localStorage.setItem(jwtConfig.userData, JSON.stringify(payload.user));
    localStorage.setItem(jwtConfig.storageTokenKeyName, payload.accessToken);
    localStorage.setItem(jwtConfig.refreshToken, payload.refreshToken);
    const decode = jwt.decode(payload.accessToken);
    localStorage.setItem(
      jwtConfig.expires,
      JSON.stringify(new Date(decode.exp * 1000))
    );
  },
  removeLocalStorageWhenLogout: () => {
    localStorage.removeItem(jwtConfig.userData);
    localStorage.removeItem(jwtConfig.expires);
    localStorage.removeItem(jwtConfig.storageTokenKeyName);
    localStorage.removeItem(jwtConfig.refreshToken);
  },
  updateUser: (payload) => {
    localStorage.setItem(jwtConfig.userData, JSON.stringify(payload.user));
  },
  updateStorageWhenRefreshToken: (payload) => {
    localStorage.setItem(jwtConfig.storageTokenKeyName, payload.accessToken);
    const decode = jwt.decode(payload.accessToken);
    localStorage.setItem(
      jwtConfig.expires,
      JSON.stringify(new Date(decode.exp * 1000))
    );
  },
};
