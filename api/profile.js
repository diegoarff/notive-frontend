import { api } from "./axios";

export const getProfile = async (userId) => {
  try {
    const response = await api.get(`users/profile/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to get profile: ${JSON.stringify(error.response.data)}`);
  }
};

export const updateProfile = async (userId, data) => {
  try {
    const response = await api.put(`users/profile/${userId}`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to update profile: ${JSON.stringify(error.response.data)}`);
  }
};

export const deleteAccount = async (userId) => {
  try {
    const response = await api.delete(`users/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to delete account: ${JSON.stringify(error.response.data)}`);
  }
}

export const changePassword = async (userId, data) => {
  try {
    const response = await api.put(`users/password-change/${userId}`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to change password: ${JSON.stringify(error.response.data)}`);
  }
};