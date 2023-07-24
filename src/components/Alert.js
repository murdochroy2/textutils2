import React, { useEffect } from "react";

function Alert() {
  useEffect(() => {
    console.log("Dismissing");
    setTimeout(() => {
      let alertCloseButton = document.getElementById("alert-close-button");
      console.log(alertCloseButton);
      alertCloseButton.click();
    }, 1000);
  }, []);

  return (
    props.message && (
      <div>
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>{props.alert.type}</strong>
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
