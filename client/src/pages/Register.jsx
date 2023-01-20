import React, { useState } from "react";
import "./register.scss";
import { Button } from "../common/Button";
import { TextInput } from "../common/Inputs";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API } from "../environment/Api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, SetFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const _formData = { ...formData };
    _formData[e.target.id] = e.target.value;
    SetFormData(_formData);
  };

  const handleSubmit = async () => {
    const url = `${BACKEND_API}/register`;
    const jsonBody = JSON.stringify(formData);

    const response = await fetch(url, {
      method: "POST",
      body: jsonBody,
    });
    if (response.status === 200) {
      navigate("/login");
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
          value={formData.firstName}
          onChange={handleInput}
        />
        <TextInput
          type="text"
          label="Last name"
          id="lastName"
          value={formData.lastName}
          onChange={handleInput}
        />
        <TextInput
          type="text"
          label="Username"
          id="username"
          value={formData.username}
          onChange={handleInput}
        />
        <TextInput
          type="password"
          label="Password"
          id="password"
          value={formData.password}
          onChange={handleInput}
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
