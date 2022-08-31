import React, { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";
import axios from "axios";

const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("api/auth/register", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((res) => {
        setTimeout(() => navigate("/login", { replace: true }), 2000);
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
            <Input type="text" name="firstname" value={firstname} placeholder="Prénom" onChange={(e) => setFirstname(e.target.value)} />
            <Input type="text" name="lastname" value={lastname} placeholder="Nom" onChange={(e) => setLastname(e.target.value)} />
          </div>
          <Input type="email" name="email" value={email} placeholder="Mail" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" name="password" value={password} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="btn btn-primary" value="S'inscrire"></Button>
      </form>
    </>
  );
};

export default RegisterForm;