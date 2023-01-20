import React, { useEffect, useState } from "react";
import "./comments.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BACKEND_API } from "../environment/Api";
import { data } from "../constants/data";
import error from "../assets/error-sound.mp3";
import pop from "../assets/pop-sound.mp3";

const Comments = ({ setEditMode }) => {
  const [comments, setComments] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchComments = async () => {
      const url = `${BACKEND_API}/api/v1/comments`;

      const token = JSON.parse(localStorage.getItem("token"))["access_token"];
      const headers = { Authorization: `Bearer ${token}` };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, []);

  const removeComment = async (id) => {
    const url = `${BACKEND_API}/api/v1/comments/${id}`;

    const token = JSON.parse(localStorage.getItem("token"))["access_token"];
    const headers = { Authorization: `Bearer ${token}` };

    const response = await fetch(url, { method: "DELETE", headers: headers });
    if (response.status === 200)
      setComments(comments.filter((com) => com.id !== id));

    console.log(response);
  };

  const editComment = async (id) => {
    const url = `${BACKEND_API}/api/v1/comments/${id}`;
    const jsonBody = JSON.stringify(formData);

    const token = JSON.parse(localStorage.getItem("token"))["access_token"];
    const headers = { Authorization: `Bearer ${token}` };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        title: id.title,
        content: id.content,
      }),
      headers: headers
    });

    console.log(response);
  };

  // console.log(comments)

  const playAudioError = () => {
    new Audio(error).play();
  };

  const playAudioPop = () => {
    new Audio(pop).play();
  };

  return (
    <div className="page-container">
      <div className="comments-header">
        <h1>Comments</h1>
        <Link to="/addcomments">
          <span>Add new comment</span> <AiOutlineArrowRight />
        </Link>
      </div>
      {data.map((com) => {
        return (
          <div className="comments-content" key={com.id}>
            <h3>{com.title}</h3>
            <span>
              <AiOutlineEdit
                className="icon"
                style={{ cursor: "not-allowed" }}
                onClick={playAudioError}
              />
              <AiOutlineDelete
                className="icon"
                style={{ cursor: "not-allowed" }}
                onClick={playAudioError}
              />
            </span>
            <p>{com.content}</p>
          </div>
        );
      })}
      {comments.map((com) => {
        return (
          <div className="comments-content" key={com.id}>
            <h3>{com.title}</h3>
            <span>
              <AiOutlineEdit
                className="icon"
                onClick={() => {
                  editComment(com.id);
                  playAudioPop();
                }}
              />
              <AiOutlineDelete
                className="icon"
                onClick={() => {
                  removeComment(com.id);
                  playAudioPop();
                }}
              />
            </span>
            <p>{com.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
