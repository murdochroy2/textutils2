import React, { useEffect } from "react";

function Alert() {
  useEffect(() => {
    console.log("Dismissing");
    setTimeout(() => {
      let alertCloseButton = document.getElementById("alert-close-button");
      console.log(alertCloseButton)
      alertCloseButton.click();
    }, 1000);
  }, []);

  return (
    <div>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Holy guacamole!</strong> You should check in on some of those
        fields below.
        <button
          id="alert-close-button"
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export default Alert;
