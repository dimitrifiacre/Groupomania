import axios from "axios";
import { setPosts, setUpdatePost, setLikePost, setDislikePost } from "../feature/postSlice";

const getAllPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("api/post");
      return dispatch(setPosts(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const updatePost = (postId, content) => {
  return async (dispatch) => {
    try {
      await axios.put(`api/post/${postId}`, { content });
      return dispatch(setUpdatePost({ postId, content }));
    } catch (error) {
      console.log(error);
    }
  };
};

const addLikePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      await axios.post(`api/like/${postId}`, { userId });
      return dispatch(setLikePost({ postId, userId }));
    } catch (error) {
      console.log(error);
    }
  };
};

const removeLikePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      await axios.post(`api/like/${postId}`, { userId });
      return dispatch(setDislikePost({ postId, userId }));
    } catch (error) {
      console.log(error);
    }
  };
};

export { getAllPosts, updatePost, addLikePost, removeLikePost };