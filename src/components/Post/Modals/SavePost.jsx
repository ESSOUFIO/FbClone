import { Button, Form } from "react-bootstrap";
import MyModal from "../../MyModal/MyModal";
import favoris from "../../../assets/images/favoris.png";
import { HiLockClosed } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";

const SavePost = ({ SavePostV, hideSavePost }) => {
  return (
    <MyModal showModal={SavePostV} hideFunc={hideSavePost} Title={"Save To"}>
      <div className="p-2 SavePost">
        <div className="SaveCollection">
          <div className=" d-flex gap-3">
            <div>
              <img src={favoris} alt="" width={45} className="rounded" />
            </div>
            <div>
              <h5 className="mb-0">Favoris</h5>
              <span style={{ color: "var(--color-light)" }}>
                <HiLockClosed /> Only me
              </span>
            </div>
          </div>
          <Form className="d-flex align-items-center me-2">
            <Form.Check type="radio" id="radio" checked />
          </Form>
        </div>
        <hr
          style={{
            borderTop: "1px solid var(--color-dark-less)",
            margin: "10px 0",
          }}
        />

        <div className="SaveCollection">
          <div className=" d-flex gap-3">
            <div className="addCollection">
              <AiOutlinePlus />
            </div>
            <div className="d-flex align-items-center">
              <h5 className="mb-0">New Collection</h5>
            </div>
          </div>
        </div>
        <hr
          style={{
            borderTop: "1px solid var(--color-dark-less)",
            margin: "10px 0",
          }}
        />

        <div className="text-end mb-1 mt-1">
          <Button
            variant="primary"
            style={{ fontWeight: "600", padding: "4px 35px" }}
          >
            Done
          </Button>
        </div>
      </div>
    </MyModal>
  );
};

export default SavePost;
