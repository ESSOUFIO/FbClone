import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ variant, message, style }) => {
  return (
    <Alert variant={variant} style={style}>
      {message}
    </Alert>
  );
};

export default AlertMessage;
