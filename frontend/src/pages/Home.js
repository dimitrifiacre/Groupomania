import React from "react";
import { PostForm, Feed } from "../components";

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