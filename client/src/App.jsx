import "./App.scss";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Comments from "./pages/Comments";
import AddComments from "./pages/AddComments";
import Edit from "./pages/Edit";

const App = () => {
  const [editMode, setEditMode] = useState({
    mode: false,
    id: "",
    title: "",
    content: ""
  });

  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/comments"
          element={<Comments />}
          setEditMode={setEditMode}
        />
        {!editMode.mode ? (
          <Route path="/addcomments" element={<AddComments />} />
        ) : (
          <Route
            path="/edit"
            element={<Edit />}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
