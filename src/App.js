import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import { useState } from "react";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  let name = "Rohi";
  const [mode, setMode] = useState("light");
  const removeBodyClasses = () => {
    let appliedClasses = ["dark", "light", "warning", "danger", "success", "info"]
    appliedClasses.forEach(className=>{document.body.classList.remove(`bg-${className}`)})
  }
  const toggleMode = (event, colorClass = "") => {
    console.log(colorClass);
    removeBodyClasses();
    if (event.target.checked) {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("success", "Dark mode enabled");
      let titlePrefix = document.title.slice(0, document.title.indexOf("|"));
      // document.title = `${titlePrefix} | Dark Mode`;
    } else if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("success", "Dark mode disabled");
    }
    if (colorClass) {
      document.body.classList.add(`bg-${colorClass}`)
    }
  };
  const toggleRedMode = (event) => {
    if (event.target.checked) {
      setMode("red");
      document.body.style.backgroundColor = "pink";
      showAlert("success", "Red mode enabled");
      let titlePrefix = document.title.slice(0, document.title.indexOf("|"));
      // document.title = `${titlePrefix} | Red Mode`;
    } else if (mode === "red") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("success", "Red mode disabled");
    }
  };
  const toggleGreenMode = (event) => {
    if (event.target.checked) {
      setMode("green");
      document.body.style.backgroundColor = "green";
      showAlert("success", "Green mode enabled");
      let titlePrefix = document.title.slice(0, document.title.indexOf("|"));
      // document.title = `${titlePrefix} | Green Mode`;
    } else if (mode === "green") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("success", "Green mode disabled");
    }
  };
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  return (
    <>
      <Router>
        <Navbar
          title={"Tutils"}
          aboutText="About"
          mode={mode}
          toggleMode={toggleMode}
          toggleRedMode={toggleRedMode}
          toggleGreenMode={toggleGreenMode}
        />
        <Alert alert={alert} />
        <div className="container my-2">
          <Routes>
            <Route
              path="/"
              element={
                <TextForm
                  heading="Try TUtils - Word Counter, Character Counter, Remove extra spaces and much more"
                  mode={mode}
                  showAlert={showAlert}
                />
              }
            ></Route>

            <Route path="/about" element={<About mode={mode} />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
