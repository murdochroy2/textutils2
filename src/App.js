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
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("success", "Dark mode enabled");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("success", "Dark mode disabled");
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
