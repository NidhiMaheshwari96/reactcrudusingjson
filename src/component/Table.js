import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button } from "@mui/material";
import ViewModel from "./ViewModel";
import EditModel from "./EditModel";
import Add from "./Add";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const IndexTable = () => {
  const [userData, setUserData] = useState([]);
  const [viewId, setViewId] = useState("");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isAddDone, setIsAddDone] = useState(false);

  const handleView = (id) => {
    setViewId(id);
    setIsViewOpen(true);
  };

  const handleEdit = (id) => {
    setViewId(id);
    setIsEditOpen(true);
    setIsUpdate(false);
  };

  const handleAdd = () => {
    setIsAdd(true);
    setIsAddDone(false);
  };

  useEffect(() => {
    getdata();
  }, [isUpdate, isAddDone]);

  const getdata = async () => {
    const result = await axios.get(" http://localhost:5000/data");
    setUserData(result.data);
  };

  const handleDelete = async (id) => {
    alert("Are you Sure?");
    await axios.delete(`http://localhost:5000/data/${id}`);
    getdata();
  };

  return (
    <>
      <Button variant="outlined" color="success" onClick={handleAdd}>
        Add New User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Website</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.phone}</StyledTableCell>
                <StyledTableCell>{row.website}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleView(row.id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEdit(row.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ViewModel
        isViewOpen={isViewOpen}
        setIsViewOpen={setIsViewOpen}
        viewId={viewId}
        setViewId={setViewId}
        handleEdit={handleEdit}
        isUpdate={isUpdate}
      />
      <EditModel
        viewId={viewId}
        setViewId={setViewId}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        setIsUpdate={setIsUpdate}
      />

      <Add isAdd={isAdd} setIsAdd={setIsAdd} setIsAddDone={setIsAddDone} />
    </>
  );
};

export default IndexTable;
