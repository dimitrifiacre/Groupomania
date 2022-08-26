import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: null,
  },
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setUpdatePost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.post_id === payload.postId) {
          return { ...post, post_content: payload.content };
        }

        return post;
      });
    },
    setDeletePost: (state, { payload }) => {
      state.posts = state.posts.filter((id) => id.post_id !== payload.postId);
    },
    setLikePost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.post_id === payload.postId) {
          return { ...post, Likes: [payload, ...post.Likes] };
        }

        return post;
      });
    },
    setDislikePost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.post_id === payload.postId) {
          return { ...post, Likes: post.Likes.filter((id) => id.userId !== payload.userId) };
        }

        return post;
      });
    },
  },
});

export const { setPosts, setUpdatePost, setDeletePost, setLikePost, setDislikePost } = postSlice.actions;
export default postSlice.reducer;