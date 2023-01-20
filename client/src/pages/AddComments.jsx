import React, { useState } from "react";
import "./addComments.scss";
import { Button } from "../common/Button";
import { TextInput, TextArea } from "../common/Inputs";
import { BACKEND_API } from "../environment/Api";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const AddComments = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInput = (e) => {
    const _formData = { ...formData };
    _formData[e.target.id] = e.target.value;
    setFormData(_formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BACKEND_API}/api/v1/comments`;
    const jsonBody = JSON.stringify(formData);

    const token = JSON.parse(localStorage.getItem("token"))["access_token"];
    const headers = { Authorization: `Bearer ${token}` };

    const response = await fetch(url, {
      method: "POST",
      body: jsonBody,
      headers: headers,
    });

    if (formData.title === "" || formData.content === "") {
      alert("First you must add comment");
    } else {
      navigate("/comments");
    }
  };

  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="page-container">
      <h2>Add new comment</h2>
      <div className="add-comment-form">
        <div className="cta">
          <Link to="/comments">
            <AiOutlineArrowLeft /> <span>Get back</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            label="User"
            id="title"
            placeholder="ex. John Doe"
            onChange={handleInput}
            value={formData.title}
          />
          <TextArea
            label="Comment"
            id="content"
            placeholder="ex. Lorem ipsum dolor sit amet"
            onChange={handleInput}
            value={formData.content}
          />
          <Button onClick={() => removeElement()}>Add comment</Button>
        </form>
      </div>
    </div>
  );
};

export default AddComments;
