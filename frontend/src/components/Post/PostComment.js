import React, { useEffect, useState } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../../assets/default-avatar.png";
import Avatar from "../Avatar/Avatar";
import { isEmpty } from "../Utils";
import iconSet from "../../fonts/selection.json";
import IcomoonReact from "icomoon-react";
import dayjs from "dayjs";
import Input from "../Input/Input";
import Button from "../Button/Button";

const PostComment = ({ post }) => {
  const dispatch = useDispatch();
  const [userDataAvatar, setUserDataAvatar] = useState("");
  const [content, setContent] = useState("");
  const userData = useSelector((state) => state.user.user);

  // Dayjs config
  require("dayjs/locale/fr");
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  useEffect(() => {
    if (!isEmpty(userData)) {
      if (userData.user_avatar_url == null) {
        setUserDataAvatar(avatarImg);
      } else {
        setUserDataAvatar(`${process.env.REACT_APP_API_URL}img/${userData.user_avatar_url}`);
      }
    }
  }, [userData]);

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
                    <Avatar className="avatar avatar-small" img={comment.User.user_avatar_url == null ? avatarImg : `${process.env.REACT_APP_API_URL}img/${comment.User.user_avatar_url}`} />
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

            <div className="comment__write-comment">
              <div className="comment__group">
                <Avatar className="avatar avatar-small" img={userDataAvatar} />
                <Input type="text" name="content" placeholder="Écrire un commentaire" />
              </div>
              <Button type="submit" className="btn btn-primary" icon="reply" color="#fff"></Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostComment;