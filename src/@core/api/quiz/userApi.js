// ** Axios
import axiosClient from "../../auth/jwt/jwtService";
import { QUIZ_API_URL } from "../../constants";

// ** Constants

export const userApi = {
  getUsersByEmail: ({ email, studySetId }) => {
    return axiosClient.get(
      `${QUIZ_API_URL}/user/${email}/study-set?studySetId=${studySetId}`
    );
  },
  getUsersByAdmin: ({ limit, offset, search, role, status }) => {
    let url = `${QUIZ_API_URL}/user/admin?limit=${limit}&offset=${offset}`;
    if (search && search.trim() !== "") url += `&search=${search}`;
    if (role) url += `&role=${role}`;
    if (status === 0 || status === 1) url += `&status=${status}`;
    return axiosClient.get(url);
  },
  updateStatusUser: ({ userId, isDelete }) => {
    return axiosClient.patch(`${QUIZ_API_URL}/user/admin/status/${userId}`, {
      isDelete,
    });
  },
};
