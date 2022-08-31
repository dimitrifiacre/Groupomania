import React from "react";
import "./Input.scss";

const Input = ({ type, id, name, value, placeholder, onChange }) => {
  return (
    <>
      <input className="input-text" type={type} id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    </>
  );
};

export default Input;