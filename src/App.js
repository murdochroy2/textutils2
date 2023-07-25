import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  let name = "Rohi";
  const [mode, setMode] = useState("light");
  const toggleMode = (event) => {
    if (event.target.checked) {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("success", "Dark mode enabled");
    } else if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("success", "Dark mode disabled");
    }
  };
  const toggleRedMode = (event) => {
    console.log("Current Mode is", mode);
    if (event.target.checked) {
      setMode("red");
      document.body.style.backgroundColor = "pink";
      showAlert("success", "Red mode enabled");
    } else if (mode === "red") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("success", "Red mode disabled");
    }
  };
  const toggleGreenMode = (event) => {
    console.log("Current Mode is", mode);
    if (event.target.checked) {
      setMode("green");
      document.body.style.backgroundColor = "green";
      showAlert("success", "Green mode enabled");
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
    }, 1500);
  };
  return (
    <>
      <Navbar
        title={"The Title"}
        aboutText="About"
        mode={mode}
        toggleMode={toggleMode}
        toggleRedMode={toggleRedMode}
        toggleGreenMode={toggleGreenMode}
      />
      <Alert alert={alert} />
      <div className="container my-2">
        <TextForm
          heading="Enter text to analyze here"
          mode={mode}
          showAlert={showAlert}
        />
        {/* <About /> */}
      </div>
    </>
  );
}

export default App;
