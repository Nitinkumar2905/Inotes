import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Alert from "./Components/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/signUp" element={<SignUp showAlert={showAlert} />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
