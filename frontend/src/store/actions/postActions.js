import axios from "axios";
import { setPosts } from "../feature/postSlice";

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

export { getAllPosts };