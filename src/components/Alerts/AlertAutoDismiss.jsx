import { Alert } from "react-bootstrap";
import React from "react";
import "./Alerts.css";
import { useGlobalState } from "../../context/GlobalProvider";

const AlertAutoDismiss = () => {
  const { showAlert, HideAlert, alertText } = useGlobalState();
  if (showAlert) {
    setTimeout(() => {
      HideAlert();
    }, 2000);
  }

  return (
    <div className="AlertAutoDismiss">
      <Alert
        show={showAlert}
        variant={"light"}
        onClose={HideAlert}
        dismissible
        style={{ color: "black" }}
      >
        {alertText}
      </Alert>
    </div>
  );
};

export default AlertAutoDismiss;
