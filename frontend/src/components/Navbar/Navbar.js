import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import avatarImg from "../../assets/default-avatar.png";
import Avatar from "../Avatar/Avatar";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/">
          <img src={logo} alt="Logo Groupomania" width="242px" />
        </Link>
        <Link to="/profile">
          <Avatar className="avatar avatar-small" img={avatarImg} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;