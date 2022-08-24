import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../AppContext";
import { isEmpty } from "../Utils";

const PublicRoute = ({ children }) => {
  const userId = useContext(UserContext);

  if (!isEmpty(userId)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;