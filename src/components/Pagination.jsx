/* eslint-disable react/prop-types */
// import { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
  filteredContacts,
  remainingItems,
  setItemsPerPage,
}) => {
  // const [showDropdown, setShowDropdown] = useState(false);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const handleItemShowPerPage = (e) => {
    setItemsPerPage(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <div className="border-t mt-5  bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1  sm:items-center sm:justify-between">
          <div className=" flex gap-6">
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium m-1">
                {}
                {currentPage === totalPages
                  ? remainingItems !== 0
                    ? remainingItems
                    : itemsPerPage
                  : itemsPerPage}
              </span>
              of
              <span className="font-medium m-1">{filteredContacts.length}</span>
              results
            </p>
            <div className=" flex gap-2 justify-center relative">
              <p className="text-sm text-gray-700">Show item per page</p>
              <select
                name="item-per-page"
                onChange={handleItemShowPerPage}
                className="focus:outline-none font-medium rounded-lg text-sm bg-white text-center inline-flex items-center"
              >
                <option
                  value="6"
                  className=" after:border-none after:outline-none hover:bg-slate-200"
                >
                  6
                </option>
                <option value="12">12</option>
                <option value="18">18</option>
                <option value="24">24</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end gap-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="relative inline-flex items-center   px-2 py-2 text-gray-400   hover:bg-gray-50 focus:z-20"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm  font-semibold ${
                    currentPage === index + 1
                      ? "z-10  border-t-2 border-indigo-400 text-indigo-600 "
                      : "text-gray-400  border-none   hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}{" "}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400  hover:bg-gray-50 focus:z-20"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
