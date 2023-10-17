// ** Axios import
import axiosClient from "../../auth/jwt/jwtService";

// ** Constants import
import { QUIZ_API_URL } from "../../constants/index";

export const authApi = {
  login: (data) => axiosClient.post(`${QUIZ_API_URL}/auth/login`, data),
  register: (data) => axiosClient.post(`${QUIZ_API_URL}/auth/register`, data),
  thirdPartyLogin: (data) =>
    axiosClient.post(`${QUIZ_API_URL}/auth/login-third-party`, data),
};
