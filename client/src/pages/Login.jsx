import React, { useState } from "react";
import "./login.scss";
import { Button } from "../common/Button";
import { TextInput } from "../common/Inputs";
import { BACKEND_API } from "../environment/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const _formData = { ...formData };
    _formData[e.target.id] = e.target.value;
    setFormData(_formData);
  };

  const handleSubmit = async () => {
    const url = `${BACKEND_API}/auth`;
    const jsonBody = JSON.stringify(formData);

    const response = await fetch(url, {
      method: "POST",
      body: jsonBody,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = await response.json();

    localStorage.setItem("token", JSON.stringify(token));

    if (response.status === 200) {
      navigate("/comments");
    }
  };

  return (
    <div className="login">
      <h2>Log in</h2>
      <form>
        <TextInput
          type="text"
          label="Username"
          id="username"
          onChange={handleInput}
          value={formData.username}
        />
        <TextInput
          type="password"
          label="Password"
          id="password"
          onChange={handleInput}
          value={formData.password}
        />
      </form>
      <Button onClick={handleSubmit}>Log in</Button>
    </div>
  );
};

export default Login;
