import React, { useState } from "react";
import "./Form.scss";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";
import iconSet from "../../fonts/selection.json";
import IcomoonReact from "icomoon-react";
import { useDispatch } from "react-redux";
import { createPost, getAllPosts } from "../../store/actions/postActions";

const NewPost = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Récupère l'image upload et la met dans le hook
  const changeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Reset le state pour retirer la preview
  const removeSelectedImage = () => {
    setFile("");
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (content) {
      const data = new FormData();
      data.append("content", e.target.content.value);
      if (file) data.append("image_url", file);

      await dispatch(createPost(data));
      dispatch(getAllPosts());
      resetPost();
    } else {
      setErrorMessage("La publication doit contenir du texte");
    }
  };

  const resetPost = () => {
    setContent("");
    setFile("");
  };

  return (
    <div className="card">
      {errorMessage && <Alert className="alert alert-error" value={errorMessage} />}
      <form className="post-group" onSubmit={handleNewPost}>
        <div className="input-group">
          <textarea className="input-text input-textarea" id="content" name="content" value={content} placeholder="Quoi de neuf ?" onChange={(e) => setContent(e.target.value)}></textarea>
          <input type="file" id="file" accept=".png,.jpg,.jpeg,.gif" onChange={changeImage} />
          <label className="input-file" htmlFor="file">
            <IcomoonReact iconSet={iconSet} size={14} icon="image-plus" color="#8f8a8a" />
          </label>
        </div>
        {file && (
          <div className="input-image_preview">
            <img src={URL.createObjectURL(file)} />
            <button className="btn btn-edit_image" onClick={removeSelectedImage}>
              <IcomoonReact iconSet={iconSet} size={12} icon="delete" color="#fff" />
            </button>
          </div>
        )}
        <Button type="submit" className="btn btn-primary" value="Publier"></Button>
      </form>
    </div>
  );
};

export default NewPost;