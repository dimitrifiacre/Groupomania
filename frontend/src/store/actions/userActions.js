import axios from "axios";
import { setUser } from "../feature/userSlice";

const getUser = (user_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`api/user/${user_id}`);
      return dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export { getUser };