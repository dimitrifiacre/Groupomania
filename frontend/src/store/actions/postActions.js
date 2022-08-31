import axios from "axios";
import { setPosts, setDeletePost, setLikePost, setDislikePost } from "../feature/postSlice";

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

const createPost = (data) => {
  return async () => {
    try {
      await axios.post("api/post", data);
    } catch (error) {
      console.log(error);
    }
  };
};

const updatePost = (post_id, data) => {
  return async () => {
    try {
      await axios.put(`api/post/${post_id}`, data);
    } catch (error) {
      console.log(error);
    }
  };
};

const deletePost = (post_id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`api/post/delete/${post_id}`);
      return dispatch(setDeletePost({ post_id }));
    } catch (error) {
      console.log(error);
    }
  };
};

const createComment = (post_id, content) => {
  return async () => {
    try {
      await axios.post(`api/comment/${post_id}`, { content });
    } catch (error) {
      console.log(error);
    }
  };
};

const addLikePost = (post_id, user_id) => {
  return async (dispatch) => {
    try {
      await axios.post(`api/like/${post_id}`, { user_id });
      return dispatch(setLikePost({ post_id, user_id }));
    } catch (error) {
      console.log(error);
    }
  };
};

const removeLikePost = (post_id, user_id) => {
  return async (dispatch) => {
    try {
      await axios.post(`api/like/${post_id}`, { user_id });
      return dispatch(setDislikePost({ post_id, user_id }));
    } catch (error) {
      console.log(error);
    }
  };
};

export { getAllPosts, createPost, updatePost, deletePost, createComment, addLikePost, removeLikePost };