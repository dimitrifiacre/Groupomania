import React from "react";
import NewPost from "../components/Posts/NewPost";

const Home = () => {
  document.title = "Fil d'actualité – Groupomania";

  return (
    <>
      <div className="container">
        <NewPost />
      </div>
    </>
  );
};

export default Home;