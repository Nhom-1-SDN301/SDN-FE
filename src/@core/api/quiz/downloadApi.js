import axiosClient from "../../auth/jwt/jwtService";

// ** Constants import
import { QUIZ_API_URL } from "../../constants/index";

export const downloadApi = {
  file: ({ filename }) => {
    return axiosClient.get(`${QUIZ_API_URL}/download/${filename}`);
  },
};
