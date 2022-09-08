import React from "react";
import "./Button.scss";
import iconSet from "../../assets/fonts/selection.json";
import IcomoonReact from "icomoon-react";

const Button = ({ value, className, onClick, icon, color }) => {
  return (
    <button className={icon ? className + " btn-icon" : className} onClick={onClick}>
      {icon ? <IcomoonReact iconSet={iconSet} size={14} icon={icon} color={color} /> : value}
    </button>
  );
};

export default Button;