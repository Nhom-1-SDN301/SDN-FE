// ** Axios import
import axiosClient from "../../auth/jwt/jwtService";

// ** Constants import
import { QUIZ_API_URL } from "../../constants/index";

export const classApi = {
  createClass: (data) => axiosClient.post(`${QUIZ_API_URL}/class`, data),
};
