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
    <div style={{height:"4em"}}>
      {props.alert && (
        <div>
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalizeFirstLetter(props.alert.type)}: </strong>
            {props.alert.message}
            {/* <button
            id="alert-close-button"
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Alert;
