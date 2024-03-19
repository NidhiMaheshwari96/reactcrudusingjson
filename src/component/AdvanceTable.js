import React, { useState, useMemo, useEffect } from "react";
import Card from "../Common/Card";
import Icon from "../Common/Icon";
import axios from "axios";
import "./AdvanceTable.css";

const AdvanceTable = () => {
  const [tableData, setTableData] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getdata = async (page) => {
    try {
      const response = await axios.get(
        `http://192.168.7.82:3000/v1/promotionalmail/getAllDraftMail/${page}-${itemsPerPage}`
      );

      const { data, TotalCount } = response.data;

      setTableData(data);

      console.log(TotalCount, "Totalrecord");
      console.log(itemsPerPage, "itemsPerPage");

      setTotalPages(Math.ceil(TotalCount / itemsPerPage));
    } catch (error) {
      console.log(error);
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
    <>
      <Card>
        <div className="pagination-container">
          <h4 className="card-title">Manage Service Activation/Deactivation</h4>

          <ul className="pagination-buttons">
            <li className="pagination-button-xl">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="pagination-button-sm">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {/* {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={`${
                    pageIdx === pageIndex
                      ? "pagination-button-active"
                      : "pagination-button-normal"
                  }`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))} */}
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <li className="pagination-button-sm">
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
            <li className="pagination-button-xl">
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
        <div className="custom-overflow-x">
          <div className="custom-inline-block custom-min-w-full custom-align-middle">
            <div className="custom-overflow-hidden">
              <table className="custom-table">
                <thead className="custom-bg-slate-200 custom-dark-bg-slate-700">
                  <tr>
                    <th
                      scope="col"
                      className="custom-table-th custom-header-cell custom-text-sm"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="custom-table-th custom-header-cell custom-text-sm"
                    >
                      Created Date Time
                    </th>
                    <th
                      scope="col"
                      className="custom-table-th custom-header-cell custom-text-sm"
                    >
                      Promotional Mail Master Id
                    </th>
                    <th
                      scope="col"
                      className="custom-table-th custom-header-cell custom-text-sm"
                    >
                      Mail Provider
                    </th>
                    {/* Add more header columns as needed */}
                  </tr>
                </thead>
                <tbody className="custom-bg-white custom-dark-bg-slate-800">
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td className="custom-table-td">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="custom-table-td">
                        {item.CreatedDateTime}
                      </td>
                      <td className="custom-table-td">
                        {item.PromotionalMailMasterId}
                      </td>
                      <td className="custom-table-td">{item.MailProvider}</td>
                      {/* Render more columns as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pagination-container">
          <div className="custom-select-container">
            <select
              className="custom-select"
              value={itemsPerPage}
              onChange={handlePageSizeChange}
            >
              {[10, 20, 30, 40, 50].map((itemsPerPage) => (
                <option key={itemsPerPage} value={itemsPerPage}>
                  {itemsPerPage}
                </option>
              ))}
            </select>
            <span className="custom-page-text">
              Page{" "}
              <span>
                {currentPage} of {totalPages}
              </span>
            </span>
          </div>
          <ul className="pagination-buttons">
            <li className="pagination-button-xl">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="pagination-button-sm">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={
                  currentPage === index + 1
                    ? "pagination-button-active"
                    : "pagination-button-normal"
                }
              >
                {index + 1}
              </button>
            ))}

            <li className="pagination-button-sm">
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
            <li className="pagination-button-xl">
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default AdvanceTable;
