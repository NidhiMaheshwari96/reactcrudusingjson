import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const EditModel = ({
  viewId,
  setViewId,
  isEditOpen,
  setIsEditOpen,
  setIsUpdate,
}) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setIsEditOpen(false);
    setViewId("");
    setIsUpdate(false);
    setUserData({
      name: "",
      email: "",
      phone: "",
      website: "",
    });
  };

  const Viewdata = async () => {
    const result = await axios.get(`http://localhost:5000/data/${viewId}`);
    setUserData(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/data/${viewId}`, userData);

    setIsUpdate(true);
    setIsEditOpen(false);
  };

  useEffect(() => {
    if (isEditOpen === true) {
      Viewdata();
    }
  }, [isEditOpen]);

  return (
    <>
      {isEditOpen === true ? (
        <div>
          <Modal
            open={isEditOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                sx={{ position: "absolute", top: 0, right: 10 }}
              >
                <CloseIcon />
              </IconButton>
              <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                  <h2 className="text-center mb-4">Edit A User</h2>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                      <label>Name : </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Name"
                        name="name"
                        value={userData.name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email : </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Your email"
                        name="email"
                        value={userData.email}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone : </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Enter Your mobile Number"
                        name="phone"
                        value={userData.phone}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Website : </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Website"
                        name="website"
                        value={userData.website}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <button className="btn btn-warning btn-block">
                      Update User
                    </button>
                  </form>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EditModel;
