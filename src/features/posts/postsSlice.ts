import { createSlice } from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
import type { PostState, Post } from "../../types/types";
import { fetchAllPosts, fetchPostById, createNewPost, fetchPostComments, addPostComment } from "./postsThunk";

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      })

      // Fetch single post
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch post";
      })

      // Create post
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      // Fetch comments
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        if (state.selectedPost) {
          state.selectedPost.comments = action.payload;
        }
      })

      // Add comment
      .addCase(addPostComment.fulfilled, (state, action) => {
        if (state.selectedPost) {
          state.selectedPost.comments = state.selectedPost.comments
            ? [...state.selectedPost.comments, action.payload]
            : [action.payload];
        }
      });
  },
});

export default postsSlice.reducer;