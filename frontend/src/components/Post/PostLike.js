import React, { useContext, useEffect, useState } from "react";
import "./Post.scss";
import { useDispatch } from "react-redux";
import { addLikePost, removeLikePost } from "../../app/actions/postActions";
import iconSet from "../../assets/fonts/selection.json";
import IcomoonReact from "icomoon-react";
import { UserContext } from "../AppContext";

const PostLike = ({ post }) => {
  const [postLiked, setPostLiked] = useState(false);
  const dispatch = useDispatch();
  const userId = useContext(UserContext);

  // Défini dans un hook si l'utilisateur connecté a déjà liké le post
  useEffect(() => {
    post.Likes.map((user) => user.user_id === userId && setPostLiked(true));
  }, [post, userId]);

  const handleLike = () => {
    if (!postLiked) {
      dispatch(addLikePost(post.post_id, userId));
    } else {
      dispatch(removeLikePost(post.post_id, userId));
    }
    setPostLiked(!postLiked);
  };

  return (
    <>
      {postLiked ? (
        <div className="post__likes post__likes--liked" onClick={handleLike}>
          <IcomoonReact iconSet={iconSet} size={18} icon="heart" color="#FD2D01" /> {post.Likes.length}
        </div>
      ) : (
        <div className="post__likes" onClick={handleLike}>
          <IcomoonReact iconSet={iconSet} size={18} icon="heart-line" color="#8F8A8A" /> {post.Likes.length}
        </div>
      )}
    </>
  );
};

export default PostLike;