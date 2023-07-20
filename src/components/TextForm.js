import React, { useState } from "react";

function TextForm(props) {
  const [text, setText] = useState("");
  // setText("hello world!");
  const handleUpClick = () => {
    // console.log("Up clicked");
    let upperText = text.toUpperCase();
    setText(upperText);
  };
  const handleLoClick = () => {
    // console.log("Up clicked");
    let lowerText = text.toLowerCase();
    setText(lowerText);
  };
  const handleClear = () => {
    setText("");
  };
  const handleAlternateCase = () => {
    let alternatingText = "";
    text.split("").forEach((character, index) => {
      alternatingText +=
        index % 2 == 0 ? character.toUpperCase() : character.toLowerCase();
    });

    setText(alternatingText);
  };

  const onChangeHandler = (event) => {
    // console.log(event.target.value);
    let textValue = event.target.value;
    setText(textValue);
  };

  return (
    <>
      <div className="container">
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            value={text}
            onChange={onChangeHandler}
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

      <div className="container my-3">
        <h2>Your text summary</h2>
        <p>
          {text.split(" ").length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} minute read</p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}

export default TextForm;
