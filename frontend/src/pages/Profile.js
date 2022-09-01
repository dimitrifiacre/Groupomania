import React, { useEffect, useState } from "react";
import "./Profile.scss";
import avatarImg from "../assets/default-avatar.png";
import Avatar from "../components/Avatar/Avatar";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
import iconSet from "../fonts/selection.json";
import IcomoonReact from "icomoon-react";
import Button from "../components/Button/Button";

const Profile = () => {
  const [userDataAvatar, setUserDataAvatar] = useState("");
  const userData = useSelector((state) => state.user.user);

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
    <div className="container">
      <div className="profile">
        <div className="profile__banner"></div>
        <div className="profile__user">
          <div className="profile__infos">
            <Avatar className="avatar profile__avatar" img={userDataAvatar} />
            <div>
              <span className="profile__name">
                {userData.user_firstname} {userData.user_lastname} {userData.user_admin ? <IcomoonReact iconSet={iconSet} size={16} icon="admin" color="#FD2D01" /> : null}
              </span>
              <span className="profile__job">{userData.user_job}</span>
            </div>
          </div>
          <Button className="btn btn-secondary" value="Modifier mon profil"></Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;