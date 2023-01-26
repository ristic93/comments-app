import React, { useState } from "react";
import "./register.scss";
import { Button } from "../common/Button";
import { TextInput } from "../common/Inputs";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API } from "../environment/Api";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const url = `${BACKEND_API}/register`;
    const jsonBody = JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      username: username,
      password: password,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: jsonBody,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form>
        <TextInput
          type="text"
          label="First name"
          id="firstName"
          placeholder="ex. John"
          onChange={(e) => setFristName(e.target.value)}
          value={firstName}
        />
        <TextInput
          type="text"
          label="Last name"
          id="lastName"
          placeholder="ex. Doe"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
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
      <Button onClick={handleSubmit}>Submit</Button>
      <p>
        Already have accont <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
