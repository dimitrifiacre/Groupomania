import React from "react";
import PostForm from "../components/Forms/PostForm";
import Feed from "../components/Post/Feed";

const Home = () => {
  document.title = "Fil d'actualité – Groupomania";

  return (
    <div className="container">
      <PostForm />
      <Feed />
    </div>
  );
};

export default Home;