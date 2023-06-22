import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { UserDetails } from "./Components/UserDetails";
import Alert from "./Components/Alert";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState('Light')

  const toggleMode = () => {
    if (mode === "Light") {
      setMode("Dark");
      document.body.style.backgroundColor = "green";
    }
    else {
      setMode("Light");
      document.body.style.backgroundColor = "white";
    }
  }
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  document.body.style.backgroundColor = `${mode === "Dark" ? "#404040" : "white"}`;
  return (
    <NoteState>
      <Router>
        <Navbar mode={mode} handleMode={toggleMode} />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home mode={mode} />} />
          <Route exact path="/home" element={<Home mode={mode} showAlert={showAlert} />} />
          <Route exact path="/about" element={<About mode={mode} />} />
          <Route exact path="/login" element={<Login mode={mode} showAlert={showAlert} />} />
          <Route exact path="/signUp" element={<SignUp mode={mode} showAlert={showAlert} />} />
          <Route exact path="/UserInfo" element={<UserDetails />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
