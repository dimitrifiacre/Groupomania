import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import PostCard from "./PostCard";

const Feed = () => {
  const posts = useSelector((state) => state.post.posts);

  return (
    <>
      {!isEmpty(posts) &&
        posts.map((post) => {
          return <PostCard post={post} key={post.post_id} />;
        })}
    </>
  );
};

export default Feed;