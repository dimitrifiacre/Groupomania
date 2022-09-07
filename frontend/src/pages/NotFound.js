import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container container--form">
      <div className="error__title">404</div>
      <span className="error__subtitle">Oups, cette page n'existe pas</span>
      <Link className="btn btn-primary" to="/">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;