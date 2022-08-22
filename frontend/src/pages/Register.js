import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/Forms/RegisterForm";
import logo from "../assets/groupomania_logo.png";

const Register = () => {
  document.title = "S'inscrire – Groupomania";

  return (
    <div className="container container--form">
      <img src={logo} alt="Logo Groupomania" width="242px" />
      <div className="card card--form">
        <RegisterForm />
        <span className="text-center">
          Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;