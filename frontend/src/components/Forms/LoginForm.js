import React, { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";
import axios from "axios";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("api/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
      });
  };

  return (
    <>
      {errorMessage && <Alert className="alert alert-error" value={errorMessage} />}
      <form className="form-group" onSubmit={handleLogin}>
        <div className="form-group form-group--inputs">
          <Input type="email" name="email" placeholder="Mail" />
          <Input type="password" name="password" placeholder="Mot de passe" />
        </div>
        <Button type="submit" className="btn btn-primary" value="Se connecter"></Button>
      </form>
    </>
  );
};

export default LoginForm;