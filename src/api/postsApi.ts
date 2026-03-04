import { api } from "./api";
import type { Post, Comment } from "../types/types";

export const postsApi = {
  getAllPosts: async () => {
    const { data } = await api.get<Post[]>("/api/posts");
    return data;
  },

  getPostById: async (id: string) => {
    const { data } = await api.get<Post>(`/api/posts/${id}`);
    return data;
  },

  createPost: async (formData: FormData) => {
    const { data } = await api.post<Post>("/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  getComments: async (postId: string) => {
    const { data } = await api.get<Comment[]>(`/api/posts/${postId}/comments`);
    return data;
  },

  addComment: async (postId: string, comment: { full_name: string; comment: string }) => {
    const { data } = await api.post<Comment>(`/api/posts/${postId}/comments`, comment);
    return data;
  },
};