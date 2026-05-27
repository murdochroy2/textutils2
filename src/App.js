import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Alert from "./components/Alert";
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2000);
  };

  const toggleMode = (e) => {
    if (e.target.checked) {
      setMode("dark");
      document.body.style.backgroundColor = "#0d1117";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "";
    }
    showAlert("success", e.target.checked ? "Dark mode enabled" : "Light mode enabled");
  };

  return (
    <Router>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container-fluid px-3 px-md-4">
        <Routes>
          <Route
            path="/"
            element={
              <TextForm
                heading="TextUtils — All-in-One Text Manipulation Toolkit"
                mode={mode}
                showAlert={showAlert}
              />
            }
          />
          <Route path="/about" element={<About mode={mode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
