import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/default-avatar.png";
import Avatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const Navbar = () => {
  const [imgSrc, setImgSrc] = useState("");
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!isEmpty(userData)) {
      if (userData.user_avatar_url == null) {
        setImgSrc(avatarImg);
      } else {
        setImgSrc(`${process.env.REACT_APP_API_URL}img/${userData.user_avatar_url}`);
      }
    }
  }, [userData]);

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