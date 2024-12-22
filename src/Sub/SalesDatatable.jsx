import React, { useState, useEffect } from "react";
import { data } from "./data"; // Ensure this file exists and matches the structure

const SalesDatatable = ({ selectedTab }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Effect to filter data based on selected tab, search query, and date range
  useEffect(() => {
    if (data && data[selectedTab]) {
      let filtered = data[selectedTab];

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((item) => {
          const matchesSku = item.sku?.toLowerCase().includes(query);
          const matchesCategory = item.category?.toLowerCase().includes(query);
          const matchesChildSku = item.childSku?.some((child) =>
            child.id?.toLowerCase().includes(query)
          );
          return matchesSku || matchesCategory || matchesChildSku;
        });
      }

      // Filter by date range
      const { start, end } = dateRange;
      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.purchasedAt || item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }

      setFilteredData(filtered);
    }
  }, [selectedTab, searchQuery, dateRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handlers
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDateRange({ start: "", end: "" });
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleString("en-IN", options);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-6">
        Sales Data for {selectedTab}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-6 bg-gradient-to-r from-teal-200 via-emerald-200 to-green-200 p-4 rounded-lg shadow-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by SKU, Child SKU, or Category"
          className="p-3 border border-teal-300 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex flex-wrap items-center space-x-4 mt-4 md:mt-0">
          <label className="text-teal-700">Start Date:</label>
          <input
            type="datetime-local"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
            className="p-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <label className="text-teal-700">End Date:</label>
          <input
            type="datetime-local"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
            className="p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleClearFilters}
          className="p-3 bg-gradient-to-r from-teal-200 to-green-300 text-gray-700 rounded-lg mt-4 md:mt-0"
        >
          Clear Filters
        </button>
      </div>

      {/* Rows Per Page Selector */}
      <div className="mb-6 flex justify-end">
        <label className="mr-4 text-teal-700">Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {[10, 20, 50, 100].map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-teal-200">
            <tr>
              <th className="p-3 text-center">Sr. No</th>
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">SKU</th>
              <th className="p-3 text-center">Child SKU</th>
              <th className="p-3 text-center">Qty</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={row.id} className="border-b border-gray-200">
                <td className="p-3 text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-3 text-center">
                  {formatDate(row.purchasedAt || row.date)}
                </td>
                <td className="p-3 text-center">{row.sku}</td>
                <td className="p-3 text-center">
                  {row.childSku?.map((child) => (
                    <div key={child.id}>{child.id}</div>
                  ))}
                </td>
                <td className="p-3 text-center">{row.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 bg-teal-500 hover:bg-teal-400 text-white rounded-lg disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-teal-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 bg-teal-500 hover:bg-teal-400 text-white rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SalesDatatable;
