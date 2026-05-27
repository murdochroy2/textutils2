import React from "react";

function Alert({ alert }) {
  return (
    <div style={{ height: "3.5rem" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} py-2 mb-0 rounded-0`}
          role="alert"
          style={{ fontSize: "0.875rem" }}
        >
          <strong>{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}: </strong>
          {alert.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
