import React, { useState } from "react";
import "./Input.scss";

const Input = ({ type, id, name, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input className="input-text" type={type} id={id} name={name} value={inputValue} placeholder={placeholder} onChange={handleInput} />
    </>
  );
};

export default Input;