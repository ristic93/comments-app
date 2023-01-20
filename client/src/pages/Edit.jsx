import React from "react";
import "./addComments.scss";
import { Button } from "../common/Button";
import { TextInput, TextArea } from "../common/Inputs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const Edit = ({editMode, setEditMode}) => {

    console.log(editMode)
  return (
    <div className="page-container">
      <h2>Edit comment</h2>
      <div className="add-comment-form">
        <div className="cta">
          <Link to="/comments">
            <AiOutlineArrowLeft /> <span>Get back</span>
          </Link>
        </div>
        <form>
          <TextInput
            type="text"
            label="User"
            id="title"
            placeholder="ex. John Doe"
            
          />
          <TextArea
            label="Comment"
            id="content"
            placeholder="ex. Lorem ipsum dolor sit amet"
            
          />
          <Button>Save</Button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
