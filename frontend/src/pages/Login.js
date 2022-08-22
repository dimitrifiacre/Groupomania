import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import logo from "../assets/logo.png";

const Login = () => {
  document.title = "Se connecter – Groupomania";

  return (
    <div className="container container--form">
      <img src={logo} alt="Logo Groupomania" width="242px" />
      <div className="card card--form">
        <LoginForm />
        <span className="text-center">
          Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;