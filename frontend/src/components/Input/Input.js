import React, { useState } from "react";
import "./Input.scss";
import iconSet from "../../fonts/selection.json";
import IcomoonReact from "icomoon-react";

const Input = ({ type, id, name, placeholder, getFile }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input-group">
      {getFile ? (
        <>
          <textarea className="input-text input-textarea" id={id} name={name} value={inputValue} placeholder={placeholder} onChange={handleInput}></textarea>
          <input type="file" id="file" />
          <label className="input-file" htmlFor="file">
            <IcomoonReact iconSet={iconSet} size={14} icon="image-plus" color="#8f8a8a" />
          </label>
        </>
      ) : (
        <input className="input-text" type={type} id={id} name={name} value={inputValue} placeholder={placeholder} onChange={handleInput} />
      )}
    </div>
  );
};

export default Input;