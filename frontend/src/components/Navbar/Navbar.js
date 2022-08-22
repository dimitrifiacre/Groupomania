import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/default-avatar.png";
import Avatar from "../Avatar/Avatar";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/">
          <div className="nav__logo"></div>
        </Link>
        <Link to="/profile">
          <Avatar className="avatar avatar-small" img={avatarImg} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;