import { api } from "./axios";

export const getFoldersFromUser = async (userId) => {
  try {
    const response = await api.get(`/folders/user/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      `Failed to get folders from user: ${JSON.stringify(error.response.data)}`
    );
  }
};

export const createFolder = async (folder) => {
  try {
    const response = await api.post("/folders", folder);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to create folder: ${JSON.stringify(error.response.data)}`);
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const response = await api.delete(`/folders/${folderId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to delete folder: ${JSON.stringify(error.response.data)}`);
  }
};
