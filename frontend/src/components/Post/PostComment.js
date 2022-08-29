import React, { useEffect, useState } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../../assets/default-avatar.png";
import Avatar from "../Avatar/Avatar";
import { isEmpty } from "../Utils";
import iconSet from "../../fonts/selection.json";
import IcomoonReact from "icomoon-react";
import dayjs from "dayjs";

const PostComment = ({ post }) => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const [content, setContent] = useState("");
  const userData = useSelector((state) => state.user.user);

  // Dayjs config
  require("dayjs/locale/fr");
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  // Récupère l'avatar de l'utilisateur ou lui met un avatar par défaut
  useEffect(() => {
    if (!isEmpty(post.Comments)) {
      if (post.Comments[0].User.user_avatar_url == null) {
        setImgSrc(avatarImg);
      } else {
        setImgSrc(`${process.env.REACT_APP_API_URL}img/${post.Comments.User.user_avatar_url}`);
      }
    }
  }, []);

  return (
    <>
      {!isEmpty(post.Comments) && (
        <>
          <hr />
          <div className="comments-container">
            {post.Comments.map((comment) => {
              return (
                <div className="comment" key={comment.comment_id}>
                  <div className="comment__infos">
                    <Avatar className="avatar avatar-small" img={imgSrc} />
                    <div className="infos__group infos__group--comment">
                      <span className="infos__name">
                        {comment.User.user_firstname} {comment.User.user_lastname} {comment.User.user_admin ? <IcomoonReact iconSet={iconSet} size={14} icon="admin" color="#FD2D01" /> : null}
                        <span className="infos__date"> · {dayjs(comment.comment_creation_date).locale("fr").fromNow()}</span>
                      </span>
                      <span className="comment__content">{comment.comment_content}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="">Écrire un commentaire</div>
          </div>
        </>
      )}
    </>
  );
};

export default PostComment;