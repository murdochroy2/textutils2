import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import { useState } from "react";

function App() {
  let name = "Rohi";
  const [mode, setMode] = useState("light")
  return (
    <>
      <Navbar title={"The Title"} aboutText="About" mode={mode}/>
      <div className="container my-2">
        <TextForm heading="Enter text to analyze here" mode={mode} />
        {/* <About /> */}
      </div>
    </>
  );
}

export default App;
