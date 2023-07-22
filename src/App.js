import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";

function App() {
  let name = "Rohi";
  return (
    <>
      <Navbar title={"The Title"} aboutText="About"/>
      <div className="container my-2">
        <TextForm heading="Enter text to analyze here"/>
        {/* <About /> */}
      </div>
    </>
  );
}

export default App;
