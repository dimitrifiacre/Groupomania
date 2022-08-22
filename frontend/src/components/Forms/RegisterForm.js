import React, { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";
import axios from "axios";

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("api/auth/register", {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        setTimeout(() => navigate("/login", { replace: true }), 3000);
        setSuccessMessage(res.data.message);
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
        setSuccessMessage("");
      });
  };

  return (
    <>
      {successMessage && <Alert className="alert alert-success" value={successMessage + ", redirection vers la page de connexion..."} />}
      {errorMessage && <Alert className="alert alert-error" value={errorMessage} />}
      <form className="form-group" onSubmit={handleRegister}>
        <div className="form-group form-group--inputs">
          <div className="form-group__names">
            <Input type="text" name="firstname" placeholder="Prénom" />
            <Input type="text" name="lastname" placeholder="Nom" />
          </div>
          <Input type="email" name="email" placeholder="Mail" />
          <Input type="password" name="password" placeholder="Mot de passe" />
        </div>
        <Button type="submit" className="btn btn-primary" value="S'inscrire"></Button>
      </form>
    </>
  );
};

export default RegisterForm;