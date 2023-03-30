import React from "react";
import { Card, Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import "./MyModal.css";

const Header = ({ hideModal, Title }) => {
  return (
    <>
      <header className="d-flex my-2 py-1">
        <h5 className="text-center w-100">{Title}</h5>
        <div className="closeBtn" onClick={hideModal}>
          <MdOutlineClose />
        </div>
      </header>
      <hr style={{ borderTop: "1px solid gray", margin: "0" }} />
    </>
  );
};

const MyModal = ({ children, showModal, hideFunc, Title, Large = false }) => {
  return (
    <Modal className="MyModal" show={showModal} onHide={hideFunc} centered>
      <Card className={`${Large ? "Large" : ""}`}>
        <Header hideModal={hideFunc} Title={Title} />
        {children}
      </Card>
    </Modal>
  );
};

export default MyModal;
