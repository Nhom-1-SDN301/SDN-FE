// ** JWT
import axiosClient from "../../auth/jwt/jwtService";

// ** Constants
import { QUIZ_API_URL } from "../../constants";

export const testApi = {
  getTestToDoById: ({ testId }) => {
    return axiosClient.get(`${QUIZ_API_URL}/test/${testId}`);
  },
  addQuestion: ({ testId, data }) => {
    return axiosClient.patch(`${QUIZ_API_URL}/test/${testId}`, data);
  },
  removeQuestion: ({ testId, questionId }) => {
    return axiosClient.delete(
      `${QUIZ_API_URL}/test/${testId}/questions/${questionId}`
    );
  },
  updateTest: ({ testId, data }) => {
    return axiosClient.put(`${QUIZ_API_URL}/test/${testId}`, data);
  },
  getQuestionsInTest: ({ testId }) => {
    return axiosClient.get(`${QUIZ_API_URL}/test/${testId}/questions`);
  },
  submitTest: ({ testId, data }) => {
    return axiosClient.post(`${QUIZ_API_URL}/test/${testId}/submit`, data);
  },
};
