// ** Axios
import axiosClient from "../../auth/jwt/jwtService";

// ** EndPoint
import { QUIZ_API_URL } from "../../constants";

export const termApi = {
  getTerms: ({ studySetId, password }) => {
    let url = `${QUIZ_API_URL}/term?studySetId=${studySetId}`;
    if (password) url += `&password=${password}`;
    return axiosClient.get(url);
  },
  updateTerm: (data) => {
    return axiosClient.patch(`${QUIZ_API_URL}/term`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "json",
    });
  },
};
