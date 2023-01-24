import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Comments from "./pages/Comments";

const App = () => {
  return (
    <div className="page-container">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
    </div>
  );
};

export default App;
