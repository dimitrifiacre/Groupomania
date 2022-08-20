import React, { useState } from "react";
import "./Input.scss";
import iconSet from "../../fonts/selection.json";
import IcomoonReact from "icomoon-react";

const Input = ({ type, id, name, placeholder, getFile }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // Récupère l'image upload et la met dans le hook
  const changeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Reset le state pour retirer la preview
  const removeSelectedImage = () => {
    setSelectedImage("");
  };

  return (
    <>
      <div className="input-group">
        {getFile ? (
          <>
            <textarea className="input-text input-textarea" id={id} name={name} value={inputValue} placeholder={placeholder} onChange={handleInput}></textarea>
            <input type="file" id="file" accept=".png,.jpg,.jpeg,.gif" onChange={changeImage} />
            <label className="input-file" htmlFor="file">
              <IcomoonReact iconSet={iconSet} size={14} icon="image-plus" color="#8f8a8a" />
            </label>
          </>
        ) : (
          <input className="input-text" type={type} id={id} name={name} value={inputValue} placeholder={placeholder} onChange={handleInput} />
        )}
      </div>
      {selectedImage && (
        <div className="input-image_preview">
          <img src={URL.createObjectURL(selectedImage)} />
          <button className="btn btn-edit_image" onClick={removeSelectedImage}>
            <IcomoonReact iconSet={iconSet} size={12} icon="delete" color="#fff" />
          </button>
        </div>
      )}
    </>
  );
};

export default Input;