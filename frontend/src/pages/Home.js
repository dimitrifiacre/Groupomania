import React from "react";
import PostForm from "../components/Forms/PostForm";

const Home = () => {
  document.title = "Fil d'actualité – Groupomania";

  return (
    <>
      <div className="container">
        <PostForm />
      </div>
    </>
  );
};

export default Home;