import React, { useState } from "react";

function TextForm(props) {
  const [text, setText] = useState("");
  // setText("hello world!");
  const handleUpClick = () => {
    // console.log("Up clicked");
    let upperText = text.toUpperCase();
    setText(upperText);
    props.showAlert("success", "Converted to Uppercase");
  };
  const handleLoClick = () => {
    // console.log("Up clicked");
    let lowerText = text.toLowerCase();
    setText(lowerText);
    props.showAlert("success", "Converted to Lowercase");
  };
  const handleClear = () => {
    setText("");
    props.showAlert("success", "Text cleared");
  };
  const handleAlternateCase = () => {
    let alternatingText = "";
    text.split("").forEach((character, index) => {
      alternatingText +=
        index % 2 === 0 ? character.toUpperCase() : character.toLowerCase();
    });
    setText(alternatingText);
    props.showAlert("success", "Converted to Alternate Case");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("success", "Copied to Clipboard!")
  };

  const onChangeHandler = (event) => {
    // console.log(event.target.value);
    let textValue = event.target.value;
    setText(textValue);
  };
  let modeColor = props.mode === "dark" ? "white" : "black";
  let modeBackgroundColor = props.mode === "dark" ? "grey" : "white";
  let modeTextStyle = { color: modeColor };
  let modeStyle = { color: modeColor, backgroundColor: modeBackgroundColor };
  let wordCount = 0.008 * text.split(/\s/).filter((word) => word).length;
  wordCount = wordCount.toFixed(2)
  return (
    <>
      <div className="container" style={modeTextStyle}>
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea
            className="form-control"
            id="text-box"
            rows="10"
            value={text}
            onChange={onChangeHandler}
            style={modeStyle}
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <div className="btn-group w-75" role="group" aria-label="Basic example">
            <button
              className="btn btn-primary flex-fill"
              onClick={handleUpClick}
              disabled={!text.length}
            >
              Convert to Uppercase
            </button>
            <button
              className="btn btn-primary flex-fill"
              onClick={handleLoClick}
              disabled={!text.length}
            >
              Convert to Lowercase
            </button>
            <button className="btn btn-primary flex-fill" onClick={handleClear}>
              Clear Text
            </button>
            <button className="btn btn-primary flex-fill" onClick={handleAlternateCase}>
              Convert to AlTeRnAte case
            </button>
            <button className="btn btn-primary flex-fill" onClick={handleCopy}>
              Copy Text
            </button>
            </div>
        </div>
      </div>

      <div className="container my-3" style={modeTextStyle}>
        <h2>Text summary</h2>
        <p>
          {text ? text.split(/\s/).filter((word) => word).length : 0} words and{" "}
          {text.length} characters<br></br>
          {wordCount} minute read
        </p>
        <p>
          
        </p>
        <h2>Preview</h2>
        <p style={{ wordWrap: "break-word" }}>
          {text.trim() ? text : "Enter something to preview it here"}
        </p>
      </div>
    </>
  );
}

export default TextForm;
