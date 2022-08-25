import axios from "axios";
import { setPosts, setLikePost, setDislikePost } from "../feature/postSlice";

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

export { getAllPosts, addLikePost, removeLikePost };