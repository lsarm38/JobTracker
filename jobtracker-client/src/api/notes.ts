import client from "./client";
import type { Note } from "../types";

export const getNotes = async (applicationId: number): Promise<Note[]> => {
  const { data } = await client.get(`/applications/${applicationId}/notes`);
  return data;
};

export const createNote = async (
  applicationId: number,
  content: string,
): Promise<Note> => {
  const { data } = await client.post(`/applications/${applicationId}/notes`, {
    content,
  });
  return data;
};

export const deleteNote = async (
  applicationId: number,
  noteId: number,
): Promise<void> => {
  await client.delete(`/applications/${applicationId}/notes/${noteId}`);
};
