import React, { useState } from "react";

// Sample data
const sampleData = [
  { id: 1, purchasedAt: "2024-12-20T10:45:00Z", platform: "Amazon", masterSKU: "AMZ12345", qty: 5, status: "Delivered" },
  { id: 2, purchasedAt: "2024-12-19T08:30:00Z", platform: "Flipkart", masterSKU: "FLPK67890", qty: 2, status: "Pending" },
  { id: 3, purchasedAt: "2024-12-18T18:15:00Z", platform: "Shopify", masterSKU: "SHP54321", qty: 3, status: "Delivered" },
  { id: 4, purchasedAt: "2024-12-17T12:00:00Z", platform: "eBay", masterSKU: "EBY65432", qty: 4, status: "Pending" },
  { id: 5, purchasedAt: "2024-12-16T15:45:00Z", platform: "Amazon", masterSKU: "AMZ98765", qty: 1, status: "Delivered" },
  { id: 1, purchasedAt: "2024-12-20T10:45:00Z", platform: "Amazon", masterSKU: "AMZ12345", qty: 5, status: "Delivered" },
  { id: 2, purchasedAt: "2024-12-19T08:30:00Z", platform: "Flipkart", masterSKU: "FLPK67890", qty: 2, status: "Pending" },
  { id: 3, purchasedAt: "2024-12-18T18:15:00Z", platform: "Shopify", masterSKU: "SHP54321", qty: 3, status: "Delivered" },
  { id: 4, purchasedAt: "2024-12-17T12:00:00Z", platform: "eBay", masterSKU: "EBY65432", qty: 4, status: "Pending" },
  { id: 5, purchasedAt: "2024-12-16T15:45:00Z", platform: "Amazon", masterSKU: "AMZ98765", qty: 1, status: "Delivered" },
  { id: 1, purchasedAt: "2024-12-20T10:45:00Z", platform: "Amazon", masterSKU: "AMZ12345", qty: 5, status: "Delivered" },
  { id: 2, purchasedAt: "2024-12-19T08:30:00Z", platform: "Flipkart", masterSKU: "FLPK67890", qty: 2, status: "Pending" },
  { id: 3, purchasedAt: "2024-12-18T18:15:00Z", platform: "Shopify", masterSKU: "SHP54321", qty: 3, status: "Delivered" },
  { id: 4, purchasedAt: "2024-12-17T12:00:00Z", platform: "eBay", masterSKU: "EBY65432", qty: 4, status: "Pending" },
  { id: 5, purchasedAt: "2024-12-16T15:45:00Z", platform: "Amazon", masterSKU: "AMZ98765", qty: 1, status: "Delivered" },
];

const InventoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filtersApplied, setFiltersApplied] = useState(false);

  const applyFilter = () => setFiltersApplied(true);
  const clearFilter = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    setFiltersApplied(false);
  };

  // Filter data based on search and date range
  const filteredData = sampleData.filter((item) => {
    const matchesSearch = searchQuery
      ? item.masterSKU.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesDate = startDate && endDate
      ? new Date(item.purchasedAt) >= new Date(startDate) &&
      new Date(item.purchasedAt) <= new Date(endDate)
      : true;

    return matchesSearch && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const formatDateToIndian = (date) => {
    const parsedDate = new Date(date);

    // Extract date components
    const day = String(parsedDate.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = parsedDate.getFullYear();

    // Extract time components
    const hours = String(parsedDate.getHours()).padStart(2, '0'); // Add leading zero if needed
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0'); // Add leading zero if needed

    // Combine date and time
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };


  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-teal-700 mb-8">Inventory Management</h1>

      <div className="bg-emerald-200 shadow-lg rounded-lg p-6 mb-8">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by SKU, Platform, or Status"
            className="w-1/3 p-3 rounded-lg border-2 border-green-400 focus:ring-4 focus:ring-green-300"
          />
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="startDate" className="block text-gray-600 font-medium">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 rounded-lg border-2 border-teal-400 focus:ring-4 focus:ring-teal-300"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-gray-600 font-medium">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 rounded-lg border-2 border-teal-400 focus:ring-4 focus:ring-teal-300"
              />
            </div>
            <div>
              <label htmlFor="rowsPerPage" className="block text-gray-600 font-medium">
                Rows per page:
              </label>
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to the first page when rows per page changes
                }}
                className="p-3 rounded-lg border-2 border-green-400 focus:ring-4 focus:ring-green-300"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={clearFilter}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <table className="w-full text-center bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-teal-300 via-green-300 to-emerald-300 text-teal-900">
          <tr>
            <th className="py-3 px-2">No</th>
            <th className="py-3 px-2">Purchased At</th>
            <th className="py-3 px-2">Platform</th>
            <th className="py-3 px-2">SKU</th>
            <th className="py-3 px-2">Qty</th>
            <th className="py-3 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-green-100">
                <td className="py-3 px-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="py-3 px-2">{formatDateToIndian(item.purchasedAt)}</td>
                <td className="py-3 px-2">{item.platform}</td>
                <td className="py-3 px-2">{item.masterSKU}</td>
                <td className="py-3 px-2">{item.qty}</td>
                <td className="py-3 px-2 w-fit">
                  <span
                    className={`py-2 px-2 w-28 rounded-full text-sm font-semibold ${item.status === 'Delivered' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      }`}
                  >
                    {item.status}
                  </span>
                </td>

              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-gray-500">No data found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-teal-800 font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InventoryPage;
