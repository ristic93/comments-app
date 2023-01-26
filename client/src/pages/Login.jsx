import React, { useState } from "react";
import "./login.scss";
import { Button } from "../common/Button";
import { TextInput } from "../common/Inputs";
import { BACKEND_API } from "../environment/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const url = `${BACKEND_API}/auth`;
    const jsonBody = JSON.stringify({
      username: username,
      password: password,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: jsonBody,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const token = data.access_token;

      localStorage.setItem("token", JSON.stringify(token));

      if (response.status === 200) {
        navigate("/comments");
      }
    } catch (err) {
      console.log(err);
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
          placeholder="ex. JohnDoe123"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <TextInput
          type="password"
          label="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </form>
      <Button onClick={handleSubmit}>Log in</Button>
    </div>
  );
};

export default Login;
