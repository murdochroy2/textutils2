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

  const onChangeHandler = (event) => {
    // console.log(event.target.value);
    let textValue = event.target.value;
    setText(textValue);
  };
  let modeColor = props.mode === "dark" ? "white" : "black";
  let modeBackgroundColor = props.mode === "dark" ? "grey" : "white";
  let modeTextStyle = { color: modeColor };
  let modeStyle = { color: modeColor, backgroundColor: modeBackgroundColor };
  return (
    <>
      <div className="container" style={modeTextStyle}>
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            value={text}
            onChange={onChangeHandler}
            style={modeStyle}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleClear}>
          Clear Text
        </button>
        <button className="btn btn-primary mx-1" onClick={handleAlternateCase}>
          Convert to aLtErNaTeCaSe
        </button>
      </div>

      <div className="container my-3" style={modeTextStyle}>
        <h2>Your text summary</h2>
        <p>
          {text ? text.split(/\s/).filter(word => word).length : 0} words and {text.length} characters
        </p>
        <p>{0.008 * text.trim().length} minute read</p>
        <h2>Preview</h2>
        <p style={{ wordWrap: "break-word" }}>
          {text.trim() ? text : "Enter something to preview it here"}
        </p>
      </div>
    </>
  );
}

export default TextForm;
