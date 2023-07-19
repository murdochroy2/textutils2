import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";

function App() {
  let name = "Rohi";
  return (
    <>
      <Navbar title={"The Title"} aboutText="About Tutils"/>
      <div className="container my-2">
        <TextForm heading="Enter text to analyze here"/>
      </div>
    </>
  );
}

export default App;
