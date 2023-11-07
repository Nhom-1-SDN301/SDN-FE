// ** Axios import
import axiosClient from "../../auth/jwt/jwtService";

// ** Constants import
import { QUIZ_API_URL } from "../../constants/index";

export const authApi = {
  login: (data) => axiosClient.post(`${QUIZ_API_URL}/auth/login`, data),
  register: (data) => axiosClient.post(`${QUIZ_API_URL}/auth/register`, data),
  changePassword: (data) =>
    axiosClient.patch(`${QUIZ_API_URL}/auth/password`, data),
  thirdPartyLogin: (data) =>
    axiosClient.post(`${QUIZ_API_URL}/auth/login-third-party`, data),
  verifyResetPassword: ({ email }) => {
    return axiosClient.post(
      `${QUIZ_API_URL}/auth/reset-password`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  resetPassword: ({ password, token }) => {
    return axiosClient.post(
      `${QUIZ_API_URL}/auth/reset-password/${token}`,
      {
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
