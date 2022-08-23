import axios from "axios";
import { setUser } from "../feature/userSlice";

const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`api/user/${userId}`);
      return dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export { getUser };