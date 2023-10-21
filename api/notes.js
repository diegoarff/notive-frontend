import { api } from "./axios";

export const getNotesFromUser = async (userId) => {
  try {
    const response = await api.get(`/notes/user/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to get notes from user: ${error}`);
  }
};

export const updateNote = async (noteId, note) => {
  try {
    const response = await api.put(`/notes/${noteId}`, note);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to update note: ${error}`);
  }
};

export const createNote = async (note) => {
  try {
    const response = await api.post("/notes", note);
    return response.data.data;
  } catch (error) {
    throw new Error(
      `Failed to create note: ${JSON.stringify(error.response.data)}}`
    );
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to delete note: ${JSON.stringify(error.response.data)}`);
  }
};
