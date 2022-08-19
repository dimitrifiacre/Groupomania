import React from "react";
import "./Avatar.scss";

const Avatar = ({ className, img }) => {
  return (
    <>
      <img className={className} crossOrigin="anonymous" src={img} alt="Photo de profil" />
    </>
  );
};

export default Avatar;