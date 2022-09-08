import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/userSlice";
import postReducer from "./feature/postSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});