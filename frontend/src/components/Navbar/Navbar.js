import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/default-avatar.png";
import Avatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [imgSrc, setImgSrc] = useState("");
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    try {
      const userAvatar = userData && userData.user_avatar_url;
      if (userAvatar == null) {
        setImgSrc(avatarImg);
      } else {
        setImgSrc(`${process.env.REACT_APP_API_URL}img/${userData.user_avatar_url}`);
      }
    } catch (error) {
      throw error;
    }
  });

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/">
          <div className="nav__logo"></div>
        </Link>
        <Link to="/profile">
          <Avatar className="avatar avatar-small" img={imgSrc} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;