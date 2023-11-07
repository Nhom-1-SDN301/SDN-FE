// ** Axios import
import axiosClient from '../../auth/jwt/jwtService';

// ** Constants import
import { QUIZ_API_URL } from "../../constants/index";

export const folderApi = {

  createFolder: (data) => axiosClient.post(`${QUIZ_API_URL}/folder/create`, data),

  getAllFolders: (data) => axiosClient.get(`${QUIZ_API_URL}/folder/getAll`, data),

  addStudySetToFolder: (folderId, StudySetId) =>{
    return axiosClient.post(`${QUIZ_API_URL}/folder/addStudySetToFolder`,{
      "folderId" : folderId,
      "studySetId" : StudySetId
    })
  },
  
  deleteStudySetFromFolder:(folderId, StudySetId) =>{
    return axiosClient.delete(`${QUIZ_API_URL}/folder/deleteStudySetFromFolder?folderId=${folderId}&studySetId=${StudySetId}`,{
    })
  },

  getStudySetByFolderId: (folderId) => {
    return axiosClient.get(`${QUIZ_API_URL}/folder/getStudySetByFolderId?folderId=${folderId}`)
  },

  getAllFolder: ({ limit, offset, search }) => {
    let url = `${QUIZ_API_URL}/folder/getAll?limit=${limit}&offset=${offset}`;
    if (search) url += `&search=${search}`;
    return axiosClient.get(url);
  },

  deleteFolder: ({ folderId }) => {
    return axiosClient.delete(`${QUIZ_API_URL}/folder?id=${folderId}`)
  },

  updateFolder: ({ id, title, description}) => {
    return axiosClient.patch(`${QUIZ_API_URL}/folder`, {
      id,
      title,
      description,
    });
  },

};
