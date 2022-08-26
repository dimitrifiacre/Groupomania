import React, { useEffect, useState } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../../assets/default-avatar.png";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import { isEmpty } from "../Utils";
import iconSet from "../../fonts/selection.json";
import IcomoonReact from "icomoon-react";
import PostLike from "./PostLike";
import { updatePost } from "../../store/actions/postActions";
import Alert from "../Alert/Alert";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [postIsUpdated, setPostIsUpdated] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postFile, setPostFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!isEmpty(userData)) {
      if (userData.user_admin === true) setIsAdmin(true);
      if (userData.user_id === post.User.user_id) setIsOwner(true);
    }
  }, [userData]);

  // Récupère l'avatar de l'utilisateur ou lui met un avatar par défaut
  useEffect(() => {
    if (post.User.user_avatar_url == null) {
      setImgSrc(avatarImg);
    } else {
      setImgSrc(`${process.env.REACT_APP_API_URL}img/${post.User.user_avatar_url}`);
    }
  }, []);

  // Récupère l'image upload et la met dans le hook
  const changeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPostFile(e.target.files[0]);
    }
  };

  // Reset le state pour retirer la preview
  const removeSelectedImage = () => {
    setFile("");
  };

  const handlePostEdit = async (e) => {
    e.preventDefault();
    if (postContent) {
      const data = new FormData();
      data.append("content", postContent);
      dispatch(updatePost(post.post_id, postContent));
      setErrorMessage("");
      setPostIsUpdated(false);
    } else {
      setErrorMessage("La publication doit contenir du texte");
    }
  };

  return (
    <div className="card" key={post.post_id}>
      <div className="post__header">
        <div className="post__infos">
          <Avatar className="avatar avatar-small" img={imgSrc} />
          <div className="infos__group">
            <span className="infos__name">
              {post.User.user_firstname} {post.User.user_lastname} {post.User.user_admin ? <IcomoonReact iconSet={iconSet} size={12} icon="admin" color="#FD2D01" /> : null}
            </span>
            <span className="infos__date">{post.post_creation_date}</span>
          </div>
        </div>
        {(isAdmin || isOwner) && (
          <Button
            className="btn btn-tertiary btn-admin"
            icon="edit"
            color="#8f8a8a"
            onClick={() => {
              setPostIsUpdated(!postIsUpdated);
              setErrorMessage("");
              setPostContent(`${post.post_content}`);
            }}
          ></Button>
        )}
      </div>
      {postIsUpdated ? (
        <>
          {errorMessage && <Alert className="alert alert-error" value={errorMessage} />}
          <form className="post-group" onSubmit={handlePostEdit}>
            <div className="input-group">
              <textarea className="input-text input-textarea" id="content" name="content" value={postContent} placeholder="Quoi de neuf ?" onChange={(e) => setPostContent(e.target.value)}></textarea>
              <input type="file" id="postFile" accept=".png,.jpg,.jpeg,.gif" onChange={changeImage} />
              <label className="input-file" htmlFor="postFile">
                <IcomoonReact iconSet={iconSet} size={14} icon="image-plus" color="#8f8a8a" />
              </label>
            </div>
            {postFile && (
              <div className="input-image_preview">
                <img src={URL.createObjectURL(postFile)} />
                <button className="btn btn-edit_image" onClick={removeSelectedImage}>
                  <IcomoonReact iconSet={iconSet} size={12} icon="delete" color="#fff" />
                </button>
              </div>
            )}
            {post.post_image_url}
            <div className="post-group--buttons">
              <Button
                className="btn btn-secondary"
                value="Annuler"
                onClick={() => {
                  setPostIsUpdated(!postIsUpdated);
                }}
              ></Button>
              <Button type="submit" className="btn btn-primary" value="Modifier ma publication"></Button>
            </div>
          </form>
        </>
      ) : (
        <div className="post__content">
          {post.post_content}
          {post.post_image_url && <img className="post__image" crossOrigin="anonymous" src={`${process.env.REACT_APP_API_URL}img/${post.post_image_url}`} alt="Photo de la publication" />}
        </div>
      )}

      <div className="post__footer">
        <PostLike post={post} />
        <div className="post__comments">
          <IcomoonReact iconSet={iconSet} size={18} icon="comment" color="#8F8A8A" />
          {post.Comments.length}
        </div>
      </div>
    </div>
  );
};

export default PostCard;