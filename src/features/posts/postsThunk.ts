import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsApi } from "../../api/postsApi";

// Получить все посты
export const fetchAllPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  return await postsApi.getAllPosts();
});

// Получить пост по id
export const fetchPostById = createAsyncThunk("posts/fetchById", async (id: string) => {
  return await postsApi.getPostById(id);
});

// Создать пост
export const createNewPost = createAsyncThunk("posts/create", async (formData: FormData) => {
  return await postsApi.createPost(formData);
});

// Получить комментарии к посту
export const fetchPostComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId: string) => {
    return await postsApi.getComments(postId);
  }
);

// Добавить комментарий к посту
export const addPostComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }: { postId: string; comment: { full_name: string; comment: string } }) => {
    return await postsApi.addComment(postId, comment);
  }
);