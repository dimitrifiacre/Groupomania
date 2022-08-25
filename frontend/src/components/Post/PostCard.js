import React, { useEffect, useState } from "react";
import "./Post.scss";
import { useSelector } from "react-redux";
import avatarImg from "../../assets/default-avatar.png";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import { isEmpty } from "../Utils";
import iconSet from "../../fonts/selection.json";
import IcomoonReact from "icomoon-react";
import PostLike from "./PostLike";

const PostCard = ({ post }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!isEmpty(userData)) {
      if (userData.user_admin === true) setIsAdmin(true);
      if (userData.user_id === post.User.user_id) setIsOwner(true);
    }
  }, [userData]);

  useEffect(() => {
    if (post.User.user_avatar_url == null) {
      setImgSrc(avatarImg);
    } else {
      setImgSrc(`${process.env.REACT_APP_API_URL}img/${post.User.user_avatar_url}`);
    }
  }, []);

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
        {(isAdmin || isOwner) && <Button className="btn btn-tertiary btn-admin" icon="more-menu" color="#8f8a8a"></Button>}
      </div>
      <div className="post__content">
        {post.post_content}
        {post.post_image_url && <img className="post__image" crossOrigin="anonymous" src={`${process.env.REACT_APP_API_URL}img/${post.post_image_url}`} alt="Photo de la publication" />}
      </div>
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