// ** Axios import
import axiosClient from "../../auth/jwt/jwtService";

// ** Constants import
import { QUIZ_API_URL } from "../../constants/index";

export const classApi = {
  createClass: (data) => axiosClient.post(`${QUIZ_API_URL}/class`, data),
  getClassOfUser: () => axiosClient.get(`${QUIZ_API_URL}/class`),
  joinClassWithCode: ({ code }) => {
    return axiosClient.post(`${QUIZ_API_URL}/class/join`, { code });
  },
  getClassById: ({ id }) => {
    return axiosClient.get(`${QUIZ_API_URL}/class/${id}`);
  },
  updateClass: ({ id, data }) => {
    return axiosClient.patch(`${QUIZ_API_URL}/class/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "json",
    });
  },
  createPost: ({ classId, data }) => {
    return axiosClient.post(`${QUIZ_API_URL}/class/${classId}/post`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "json",
    });
  },
  getPostsOfClass: ({ classId, limit, offset }) => {
    return axiosClient.get(
      `${QUIZ_API_URL}/class/${classId}/post?limit=${limit}&offset=${offset}`
    );
  },
  getComments: ({ classId, postId }) => {
    return axiosClient.get(
      `${QUIZ_API_URL}/class/${classId}/post/${postId}/comment`
    );
  },
  createComment: ({ classId, postId, data }) => {
    return axiosClient.post(
      `${QUIZ_API_URL}/class/${classId}/post/${postId}/comment`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "json",
      }
    );
  },
  resetInviteCode: ({ classId }) => {
    return axiosClient.patch(`${QUIZ_API_URL}/class/${classId}/reset-code`);
  },
  turnOffInviteCode: ({ classId }) => {
    return axiosClient.patch(`${QUIZ_API_URL}/class/${classId}/turnOff-code`);
  },
  deleteComment: ({ classId, postId, mainCommentId, subCommentId }) => {
    const body = { mainCommentId };
    if (subCommentId) body["subCommentId"] = subCommentId;

    return axiosClient.delete(
      `${QUIZ_API_URL}/class/${classId}/post/${postId}/comment`,
      {
        data: body,
      }
    );
  },
  updateComment: ({
    classId,
    postId,
    mainCommentId,
    subCommentId,
    content,
  }) => {
    const body = { mainCommentId, content };
    if (subCommentId) body["subCommentId"] = subCommentId;
    return axiosClient.patch(
      `${QUIZ_API_URL}/class/${classId}/post/${postId}/comment`,
      body
    );
  },
  getMembersInClass: ({ classId, search = "" }) => {
    return axiosClient.get(
      `${QUIZ_API_URL}/class/${classId}/members?search=${search}`
    );
  },
  updateMemberInClass: ({
    classId,
    memberId,
    canComment,
    canPost,
    canDoTest,
    canCreateTest,
  }) => {
    return axiosClient.patch(
      `${QUIZ_API_URL}/class/${classId}/members/${memberId}/permissions`,
      {
        canComment,
        canDoTest,
        canPost,
        canCreateTest,
      }
    );
  },
  removeMembersFromClass: ({ classId, members }) => {
    return axiosClient.delete(`${QUIZ_API_URL}/class/${classId}/members`, {
      data: {
        members,
      },
    });
  },
  sendEmailToMembers: ({ classId, members, message, subject }) => {
    return axiosClient.post(
      `${QUIZ_API_URL}/class/${classId}/members/sendMail`,
      {
        subject,
        message,
        members,
      }
    );
  },
  getTestsInClass: ({ classId }) => {
    return axiosClient.get(`${QUIZ_API_URL}/class/${classId}/test`);
  },
  getAllTestsInClass: ({ classId }) => {
    return axiosClient.get(`${QUIZ_API_URL}/class/${classId}/test/manager`)
  },
  removeTestInClass: ({ classId, testId }) => {
    return axiosClient.delete(`${QUIZ_API_URL}/class/${classId}/test/${testId}`)
  },
  getTest: ({ classId, testId }) => {
    return axiosClient.get(`${QUIZ_API_URL}/class/${classId}/test/${testId}`)
  }
};
