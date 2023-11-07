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
  createStudySet: ({ title, description, canVisit, visitPassword }) => {
    return axiosClient.post(`${QUIZ_API_URL}/study-set`, {
      title,
      description,
      canVisit,
      visitPassword,
    });
  },
  getAllStudySetByUserId: () => {
      return axiosClient.get(`${QUIZ_API_URL}/study-set/getAll`);
  },
  deleteStudySet: ({ studySetId }) => {
    return axiosClient.delete(`${QUIZ_API_URL}/study-set?id=${studySetId}`);
  },
  updateSudySet: ({ id, title, description, canVisit, visitPassword }) => {
    return axiosClient.patch(`${QUIZ_API_URL}/study-set`, {
      id,
      title,
      description,
      canVisit,
      visitPassword,
    });
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
  getRatesOfStudySet: ({ studySetId, limit, offset }) => {
    return axiosClient.get(
      `${QUIZ_API_URL}/study-set/${studySetId}/rate?limit=${limit}&offset=${offset}`
    );
  },
  getRateStudySetOfUser: ({ studySetId, userId }) => {
    return axiosClient.get(
      `${QUIZ_API_URL}/study-set/${studySetId}/rate/user/${userId}`
    );
  },
  putRateStudySet: ({ studySetId, star, comment }) => {
    return axiosClient.put(`${QUIZ_API_URL}/study-set/${studySetId}/rate`, {
      star,
      comment,
    });
  },
  shareToUsers: ({ studySetId, users }) => {
    return axiosClient.post(`${QUIZ_API_URL}/study-set/${studySetId}/share`, {
      users,
    });
  },
  createReportStudySet: ({ studySetId, types, description }) => {
    return axiosClient.post(`${QUIZ_API_URL}/study-set-report`, {
      studySetId,
      types,
      description,
    });
  },
  getReportStudySets: ({ status }) => {
    let url = `${QUIZ_API_URL}/study-set-report`;
    if (status !== null || status !== undefined) url += `?status=${status}`;
    return axiosClient.get(url);
  },
  updateReport: (data) => {
    return axiosClient.patch(
      `${QUIZ_API_URL}/study-set-report/${data.id}`,
      data
    );
  },
  getStudySetShared: () => {
    return axiosClient.get(`${QUIZ_API_URL}/study-set/shared`);
  },
};
