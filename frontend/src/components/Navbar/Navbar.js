import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Avatar } from "../index";
import avatarImg from "../../assets/default-avatar.png";
import { isEmpty } from "../Utils";

const Navbar = () => {
  const [userDataAvatar, setUserDataAvatar] = useState("");
  const userData = useSelector((state) => state.user.user);

  // Si null affiche un avatar par défaut sinon affiche l'avatar de l'utilisateur
  useEffect(() => {
    if (!isEmpty(userData)) {
      if (userData.user_avatar_url == null) {
        setUserDataAvatar(avatarImg);
      } else {
        setUserDataAvatar(`${process.env.REACT_APP_API_URL}img/${userData.user_avatar_url}`);
      }
    }
  }, [userData]);

  const handleLogout = async () => {
    await axios
      .post("api/auth/logout")
      .then((res) => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/">
          <div className="nav__logo"></div>
        </Link>
        <div className="nav__profile">
          <Button className="btn btn-secondary" icon="logout" onClick={handleLogout}></Button>
          <Link to="/profile">
            <Avatar className="avatar avatar-small" img={userDataAvatar} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;