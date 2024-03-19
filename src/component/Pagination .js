import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Pgination.css";
import { TableRowsLoader } from "./Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PaginationTable = () => {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const getdata = async (page) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://192.168.7.82:3000/v1/promotionalmail/getAllDraftMail/${page}-${itemsPerPage}`
      );
      console.log(response);
      const { data, TotalCount } = response.data;
      setData(data);
      setTotalPages(Math.ceil(TotalCount / itemsPerPage));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      // debugger;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata(currentPage);
  }, [currentPage]); // Only listen to changes in currentPage

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setItemsPerPage(newSize);
    setCurrentPage(1); // Reset to first page when changing itemsPerPage
  };

  useEffect(() => {
    getdata(1); // Call getdata with page 1 when changing itemsPerPage
  }, [itemsPerPage]);

  return (
    <div className="paginated-table">
      {!isLoading === true ? (
        <TableRowsLoader rowsNum={itemsPerPage} colunmNum={3} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Created Date Time</TableCell>
              <TableCell>Promotional Mail Master Id</TableCell>
              <TableCell>Mail Provider</TableCell>
              {/* Add more header columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </TableCell>
                <TableCell>{item?.CreatedDateTime}</TableCell>
                <TableCell>{item?.PromotionalMailMasterId}</TableCell>
                <TableCell>{item?.mailProvider}</TableCell>
                {/* Render more columns as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* <span>
          Page {currentPage} of {totalPages}
        </span> */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="pagination-options">
        Show
        <select value={itemsPerPage} onChange={handlePageSizeChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        entries
      </div>
    </div>
  );
};

export default PaginationTable;
