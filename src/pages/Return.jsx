import React, { useEffect, useState } from "react";

// Sample items data (assuming fetched from server)
const items = [
  {
    id: 1,
    returnDate: "2024-12-20T14:30:00",
    status: "Returned",
    platform: "Amazon",
    masterSKU: "AMZ98765",
  },
  {
    id: 2,
    returnDate: "2024-12-22T10:15:00",
    status: "Pending",
    platform: "eBay",
    masterSKU: "EBAY12345",
  },
  {
    id: 3,
    returnDate: "2024-12-15T09:00:00",
    status: "Returned",
    platform: "Amazon",
    masterSKU: "AMZ12345",
  },
  {
    id: 4,
    returnDate: "2024-12-18T11:30:00",
    status: "Pending",
    platform: "Walmart",
    masterSKU: "WAL98765",
  },
  {
    id: 5,
    returnDate: "2024-12-19T08:45:00",
    status: "Returned",
    platform: "eBay",
    masterSKU: "EBAY56789",
  },
  {
    id: 6,
    returnDate: "2024-12-21T17:20:00",
    status: "Pending",
    platform: "Amazon",
    masterSKU: "AMZ45678",
  },
  {
    id: 7,
    returnDate: "2024-12-14T12:00:00",
    status: "Returned",
    platform: "Target",
    masterSKU: "TG12345",
  },
  {
    id: 8,
    returnDate: "2024-12-13T13:40:00",
    status: "Pending",
    platform: "eBay",
    masterSKU: "EBAY67890",
  },
  {
    id: 9,
    returnDate: "2024-12-16T16:10:00",
    status: "Returned",
    platform: "Amazon",
    masterSKU: "AMZ23456",
  },
  {
    id: 10,
    returnDate: "2024-12-17T07:25:00",
    status: "Pending",
    platform: "Walmart",
    masterSKU: "WAL54321",
  },
  {
    id: 11,
    returnDate: "2024-12-14T12:00:00",
    status: "Returned",
    platform: "Target",
    masterSKU: "TG12345",
  },
  {
    id: 12,
    returnDate: "2024-12-13T13:40:00",
    status: "Pending",
    platform: "eBay",
    masterSKU: "EBAY67890",
  },
];


// Utility function to format date
const formatDateTimeToIndian = (dateString) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateString).toLocaleString("en-IN", options);
};

const Return = () => {
  const [returnedItems, setReturnedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const getReturnedItems = async () => {
      setReturnedItems(items);
      setLoading(false);
    };

    getReturnedItems();
  }, []);

  // Filter data based on search query
  const filteredItems = returnedItems.filter((item) =>
    item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.masterSKU.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="container mx-auto p-8 bg-white">
      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by Platform, SKU, or Status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg px-5 py-3 bg-gradient-to-r from-teal-100 to-green-100 text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-300 transition duration-200"
        />
      </div>

      {loading ? (
        <div className="text-center text-white text-xl">Loading...</div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-cyan-200 rounded-lg shadow-lg">
            <thead className="bg-gradient-to-r from-teal-500 to-cyan-500">
              <tr>
                <th className="px-6 py-4 text-center text-white">Sr. No.</th>
                <th className="px-6 py-4 text-center text-white">Return Date</th>
                <th className="px-6 py-4 text-center text-white">Master SKU</th>
                <th className="px-6 py-4 text-center text-white">Platform</th>
                <th className="px-6 py-4 text-center text-white">Return Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-teal-500">
                    No returned items found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-teal-50 transition-all ease-in-out duration-200">
                    <td className="text-center px-6 py-4 text-teal-600 border-b">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="text-center px-6 py-4 text-teal-600 border-b">
                      {formatDateTimeToIndian(item.returnDate)}
                    </td>
                    <td className="text-center px-6 py-4 text-teal-600 border-b">
                      <span className="font-mono text-sm text-teal-700">
                        {item.masterSKU.toUpperCase()}
                      </span>
                    </td>
                    <td className="text-center px-6 py-4 text-teal-600 border-b">
                      <span
                        className="text-teal-600 px-4 py-1 rounded-full">
                        {item.platform}
                      </span>
                    </td>
                    <td className="text-center px-6 py-4 text-teal-600 border-b">
                      <span
                        className={`${item.status === "Returned"
                            ? "text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                            : "text-gray-800 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 text-white">
            <div className="text-black">
              Rows per page:
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="ml-2 px-4 py-2 rounded-md bg-teal-300 text-white shadow-md hover:bg-teal-400"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center text-black">
              <span>Page: {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-700 transition duration-200"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-700 transition duration-200"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )
      }
    </div >
  );
};

export default Return;
