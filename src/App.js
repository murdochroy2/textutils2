import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  let name = "Rohi";
  return (
    <>
      <Navbar title={"The Title"} aboutText="About Tutils"/>
      <Navbar/>
    </>
  );
}

export default App;
