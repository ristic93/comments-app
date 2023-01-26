import React, { useEffect, useState } from "react";
import "./comments.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Button } from "../common/Button";
import { TextInput, TextArea } from "../common/Inputs";
import { data } from "../constants/data";
import { BACKEND_API } from "../environment/Api";
import audio_error from "../assets/error-sound.mp3";
import audio_pop from "../assets/pop-sound.mp3";

const Comments = () => {
  const [comments, setComments] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editCom, setEditCom] = useState({
    mode: false,
    id: "",
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BACKEND_API}/api/v1/comments`;
    const jsonBody = JSON.stringify({
      title: title,
      content: content,
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: jsonBody,
        headers: headers,
      });

      const data = await response.json();

      if (response.status === 200) {
        setTitle(data.title);
        setContent(data.content);
      }

      if (title === "" || content === "") {
        alert("First you must fill input section");
      }

      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const url = `${BACKEND_API}/api/v1/comments`;

      const token = JSON.parse(localStorage.getItem("token"));
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        const data = await response.json();

        if (response.status === 200) {
          setComments(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, []);

  const removeComment = async (id) => {
    const url = `${BACKEND_API}/api/v1/comments/${id}`;

    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, { method: "DELETE", headers: headers });
      if (response.status === 200) {
        setComments(comments.filter((com) => com.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editComment = async (id, idx) => {
    const url = `${BACKEND_API}/api/v1/comments/${id}`;
    const jsonBody = JSON.stringify({
      title: title,
      content: content,
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: jsonBody,
        headers: headers,
      });

      setEditCom({
        mode: true,
        id: comments[idx].id,
        title: comments[idx].title,
        content: comments[idx].content,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTitle(editCom.title);
    setContent(editCom.content);
  }, [editCom]);

  const exitEditMode = () => {
    setEditCom({
      mode: false,
      id: "",
      title: "",
      content: "",
    });
  };

  const updateEditMode = () => {
    let tempComments = [...comments];
    tempComments.forEach((com, idx) => {
      if (editCom.id === com.id) {
        tempComments[idx].title = title;
        tempComments[idx].content = content;
      }
    });

    setEditCom({
      mode: false,
      id: "",
      title: "",
      content: "",
    });
  };

  const playAudioError = () => {
    new Audio(audio_error).play();
  };

  const playAudioPop = () => {
    new Audio(audio_pop).play();
  };

  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  return (
    <section className="page-container">
      {/* add comments section */}

      {!editCom.mode ? (
        <article className="add-comment-form">
          <h2>Add new comment</h2>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              label="User"
              id="title"
              placeholder="ex. John Doe"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextArea
              label="Comment"
              id="content"
              placeholder="ex. Lorem ipsum dolor sit amet"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <Button onClick={() => removeElement()}>Add comment</Button>
          </form>
        </article>
      ) : (
        <article className="add-comment-form">
          <h2>Edit comment</h2>
          <form>
            <TextInput
              type="text"
              label="User"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextArea
              label="Comment"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <div className="cta">
              <Button onClick={updateEditMode}>Update comment</Button>
              <Button onClick={exitEditMode}>Get back</Button>
            </div>
          </form>
        </article>
      )}

      {/* edit comments section */}

      <article className="comments-header">
        <h1>Comments</h1>

        {/* dummy comments */}

        {data.map((com) => {
          return (
            <div className="comments-content" key={com.id}>
              <div className="header-content">
                <h3>{com.title}</h3>
              </div>
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

        {/* real comments */}

        {comments.map((com, idx) => {
          return (
            <div className="comments-content" key={com.id}>
              <div className="header-content">
                <h3>{com.title}</h3>
                <small>{com.createdAt.substring(0, 10)}</small>/
                <small>{com.createdAt.substring(11, 16)}</small>
              </div>
              <span>
                <AiOutlineEdit
                  className="icon"
                  onClick={() => {
                    editComment(com.id, idx);
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
      </article>
    </section>
  );
};

export default Comments;
