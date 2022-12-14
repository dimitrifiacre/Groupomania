import React, { useEffect, useState } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts, updatePost } from "../../app/actions/postActions";
import iconSet from "../../assets/fonts/selection.json";
import IcomoonReact from "icomoon-react";
import dayjs from "dayjs";
import { Alert, Avatar, Button, PostLike, PostComment } from "../index";
import avatarImg from "../../assets/default-avatar.png";
import { isEmpty } from "../Utils";

const PostCard = ({ post }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [postIsUpdated, setPostIsUpdated] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postFile, setPostFile] = useState("");
  const [postNewFile, setPostNewFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  // Dayjs config
  require("dayjs/locale/fr");
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  // Défini si l'utilisateur connecté est admin ou créateur du post
  useEffect(() => {
    if (!isEmpty(userData)) {
      if (userData.user_admin === true) setIsAdmin(true);
      if (userData.user_id === post.User.user_id) setIsOwner(true);
    }
  }, [userData]);

  // Si null affiche un avatar par défaut sinon affiche l'avatar de l'utilisateur
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
      setPostNewFile(true);
    }
  };

  const handlePostEdit = async (e) => {
    e.preventDefault();
    if (postContent) {
      const data = new FormData();
      data.append("content", postContent);
      if (postFile) data.append("image_url", postFile);
      await dispatch(updatePost(post.post_id, data));
      dispatch(getAllPosts());

      // Reset hook
      setErrorMessage("");
      setPostIsUpdated(false);
      setPostNewFile(false);
    } else {
      setErrorMessage("La publication doit contenir du texte");
    }
  };

  return (
    <div className="card">
      <div className="post__header">
        <div className="post__infos">
          <Avatar className="avatar avatar-small" img={imgSrc} />
          <div className="infos__group">
            <span className="infos__name">
              {post.User.user_firstname} {post.User.user_lastname} {post.User.user_admin ? <IcomoonReact iconSet={iconSet} size={14} icon="admin" color="#FD2D01" /> : null}
            </span>
            <span className="infos__date">{dayjs(post.post_creation_date).locale("fr").fromNow()}</span>
          </div>
        </div>
        {(isAdmin || isOwner) && (
          <div className="infos__admin">
            <Button className="btn btn-tertiary" icon="edit" color="#8f8a8a" onClick={() => {setPostIsUpdated(!postIsUpdated);setErrorMessage("");setPostContent(`${post.post_content}`);setPostFile(post.post_image_url ? `${post.post_image_url}` : null)}}></Button>
            <Button className="btn btn-tertiary" icon="delete" color="#8f8a8a" onClick={() => {if (window.confirm("Êtes-vous sûr de vouloir supprimer la publication ?")) {dispatch(deletePost(post.post_id))}}}></Button>
          </div>
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
                <img className="post__image" crossOrigin="anonymous" src={postNewFile ? URL.createObjectURL(postFile) : `${process.env.REACT_APP_API_URL}img/${postFile}`} alt="Photo de la publication" />
                <Button className="btn btn-edit_image" icon="delete" color="#fff" onClick={() => setPostFile("")}></Button>
              </div>
            )}
            <div className="post-group--buttons">
              <Button className="btn btn-secondary" value="Annuler" onClick={() => {setPostIsUpdated(!postIsUpdated)}}></Button>
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
      <PostComment post={post} />
    </div>
  );
};

export default PostCard;