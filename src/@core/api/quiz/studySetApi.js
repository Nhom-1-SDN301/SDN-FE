// ** Axios import
import axiosClient from "../../auth/jwt/jwtService";

// ** Constants import
import { QUIZ_API_URL } from "../../constants";

export const studySetApi = {
  getAllCurentStudySet: ({ limit, offset, search }) => {
    return axiosClient.get(
      `${QUIZ_API_URL}/study-set/${limit}/${offset}/${search || ""}`
    );
  },
};
