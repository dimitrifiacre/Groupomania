import React from "react";
import "./Alert.scss";

const Alert = ({ value, className }) => {
  return (
    <div className={className}>
      <span>{value}</span>
    </div>
  );
};

export default Alert;