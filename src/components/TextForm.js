import React, { useState } from "react";

function TextForm(props) {
  const [text, setText] = useState("Enter text here");
  // setText("hello world!");
  const onUpHandler = () => {
    // console.log("Up clicked");
    let upperText = text.toUpperCase();
    setText(upperText)
  };
  const onChangeHandler = (event) => {
    // console.log(event.target.value);
    let textValue = event.target.value;
    setText(textValue);
  };
  return (
    <div>
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
      <button className="btn btn-primary" onClick={onUpHandler}>
        Convert to Uppercase
      </button>
    </div>
  );
}

export default TextForm;
