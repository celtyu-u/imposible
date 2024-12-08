import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    let valid = true;
    if (username.trim() === "") {
      setUsernameValid(false);
      valid = false;
    }
    if (password.trim() === "") {
      setPasswordValid(false);
      valid = false;
    }

    if (valid) {
      // Aquí podrías agregar la lógica para enviar los datos al servidor usando Axios
      console.log("Usuario:", username);
      console.log("Contraseña:", password);
      setUsername("");
      setPassword("");
    }
  };

  const isFormFieldInvalid = (fieldName) => {
    return submitted && !fieldName;
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <div>
            <span className="login-icon">
              <i className="pi pi-chart-bar big-pi"></i>
            </span>
          </div>
          <p className="login-title">ERP Amelia</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <span className="p-float-label">
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={classNames({
                  "p-invalid": isFormFieldInvalid(usernameValid),
                })}
              />
              <label htmlFor="username">Usuario</label>
            </span>
            {isFormFieldInvalid(usernameValid) && (
              <small className="p-error">
                El nombre de usuario es requerido
              </small>
            )}
          </div>

          <div className="mb-3">
            <span className="p-float-label">
              <InputText
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classNames({
                  "p-invalid": isFormFieldInvalid(passwordValid),
                })}
              />
              <label htmlFor="password">Contraseña</label>
            </span>
            {isFormFieldInvalid(passwordValid) && (
              <small className="p-error">La contraseña es requerida</small>
            )}
          </div>

          <Button
            type="submit"
            label="Iniciar Sesión"
            className="login-button"
          />
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
