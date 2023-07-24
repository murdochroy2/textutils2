import React, { useEffect } from "react";

function Alert(props) {
  useEffect(() => {}, []);
  const effect = () => {
    console.log("Dismissing");
    setTimeout(() => {
      let alertCloseButton = document.getElementById("alert-close-button");
      console.log(alertCloseButton);
      alertCloseButton.click();
    }, 1000);
  };
  const capitalizeFirstLetter = (phrase) => {
    return phrase.slice(0, 1).toUpperCase() + phrase.slice(1);
  };

  return (
    props.alert && (
      <div>
        <div
          className={`alert alert-warning alert-dismissible fade show bg-${props.alert.type}`}
          role="alert"
        >
          <strong>{capitalizeFirstLetter(props.alert.type)}: </strong>
          {props.alert.message}
          <button
            id="alert-close-button"
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    )
  );
}

export default Alert;
