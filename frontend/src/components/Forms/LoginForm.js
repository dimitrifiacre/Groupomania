import React, { useState } from "react";
import "./Form.scss";
import axios from "axios";
import { Alert, Button, Input } from "../index";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("api/auth/login", { email: email, password: password })
      .then((res) => {window.location = "/"})
      .catch((err) => {setErrorMessage(err.response.data.error)});
  };

  return (
    <>
      {errorMessage && <Alert className="alert alert-error" value={errorMessage} />}
      <form className="form-group" onSubmit={handleLogin}>
        <div className="form-group form-group--inputs">
          <Input type="email" name="email" value={email} placeholder="Mail" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" name="password" value={password} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="btn btn-primary" value="Se connecter"></Button>
      </form>
    </>
  );
};

export default LoginForm;