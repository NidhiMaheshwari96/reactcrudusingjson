import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "./Loader"; // Import the Close icon

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ViewModel = ({
  isViewOpen,
  setIsViewOpen,
  viewId,
  setViewId,
  handleEdit,
  isUpdate,
}) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsViewOpen(false);
    setViewId("");
    setUserData([]);
  };

  const Viewdata = async () => {
    setIsLoading(true);
    const result = await axios.get(`http://localhost:5000/data/${viewId}`);
    setIsLoading(false);
    setUserData(result.data);
  };
  useEffect(() => {
    if (isViewOpen === true) {
      Viewdata();
    }
  }, [isViewOpen, isUpdate]);

  return (
    <>
      {isViewOpen === true ? (
        <div>
          <Modal
            open={isViewOpen}
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

              {isLoading === true ? (
                <Loader />
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Phone</StyledTableCell>
                        <StyledTableCell>Website</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody> */}
                    <StyledTableCell
                      onClick={() => handleEdit(viewId)}
                      css={{ cursor: "pointer" }}
                    >
                      {userData?.id}
                    </StyledTableCell>
                    <StyledTableCell>{userData?.name}</StyledTableCell>
                    <StyledTableCell>{userData?.email}</StyledTableCell>
                    <StyledTableCell>{userData?.phone}</StyledTableCell>
                    <StyledTableCell>{userData?.website}</StyledTableCell>
                    {/* </TableBody> */}
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ViewModel;
