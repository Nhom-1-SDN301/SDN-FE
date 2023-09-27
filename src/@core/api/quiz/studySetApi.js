// ** Axios import
import axiosClient from "../../auth/jwt/jwtService";

// ** Constants import
import { QUIZ_API_URL } from "../../constants";

export const studySetApi = {
  getAllCurentStudySet: ({ limit, offset, search }) => {
    let url = `${QUIZ_API_URL}/study-set?limit=${limit}&offset=${offset}`;
    if (search) url += `&search=${search}`;
    return axiosClient.get(url);
  },
  getStudySetbyId: ({ studySetId }) => {
    return axiosClient.get(`${QUIZ_API_URL}/study-set/${studySetId}`);
  },
  checkPassword: ({ studySetId, password }) => {
    return axiosClient.post(
      `${QUIZ_API_URL}/study-set/${studySetId}/password`,
      {
        password,
      }
    );
  },
  getAllTermOfStudySet: ({ studySetId, password }) => {
    return axiosClient.post(`${QUIZ_API_URL}/study-set/${studySetId}/term`, {
      password,
    });
  },
};
