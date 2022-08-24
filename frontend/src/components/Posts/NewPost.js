import React from "react";
import "./Posts.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";

const NewPost = () => {
  return (
    <div className="card">
      <form className="post-group">
        <Input type="text" placeholder="Quoi de neuf ?" getFile />
        <Button className="btn btn-primary" value="Publier"></Button>
      </form>
    </div>
  );
};

export default NewPost;