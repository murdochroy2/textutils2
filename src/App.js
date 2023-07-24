import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  let name = "Rohi";
  const [mode, setMode] = useState("light")
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark")
      document.body.style.backgroundColor = "#042743"
      setAlert("success", "Dark mode enabled")
    } else {
      setMode("light")
      document.body.style.backgroundColor = "white"
      setAlert("success", "Dark mode disabled")
    }
  }
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {

  }
  return (
    <>
      <Navbar title={"The Title"} aboutText="About" mode={mode} toggleMode={toggleMode}/>
      <Alert showAlert={showAlert} alert={alert}/>
      <div className="container my-2">
        <TextForm heading="Enter text to analyze here" mode={mode} />
        {/* <About /> */}
      </div>
    </>
  );
}

export default App;
