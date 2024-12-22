import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import filee from '../assets/Inventory.xlsx';

const Map = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayRange, setDisplayRange] = useState(10); // Default range size
    const [currentPage, setCurrentPage] = useState(1); // Current page for range

    useEffect(() => {
        const filePath = filee;

        fetch(filePath)
            .then((response) => response.arrayBuffer())
            .then((dataBuffer) => {
                const workbook = XLSX.read(dataBuffer, { type: 'array' });

                const sheetName = "SKUmapping";
                if (workbook.SheetNames.includes(sheetName)) {
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    setData(jsonData);
                    setFilteredData(jsonData); // Set initial data as filteredData
                } else {
                    console.error(`Sheet with name "${sheetName}" not found.`);
                }
            })
            .catch((error) => console.error('Error loading the Excel file:', error));
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Exclude the header row from filtering
        const filtered = data.slice(1).filter((row) =>
            row.some((cell) => cell?.toString().toLowerCase().includes(query.toLowerCase()))
        );

        // Set filtered data with the header row included
        setFilteredData([data[0], ...filtered]);
        setCurrentPage(1); // Reset to the first page
    };

    const handleRangeChange = (e) => {
        const value = Number(e.target.value);
        setDisplayRange(value);
        setCurrentPage(1); // Reset to the first page
    };

    const getCurrentData = () => {
        if (displayRange === "all") {
            return filteredData.slice(1); // Exclude headers
        }
        const startIndex = (currentPage - 1) * displayRange + 1;
        const endIndex = startIndex + displayRange;
        return filteredData.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil((filteredData.length - 1) / displayRange);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPagination = () => {
        const pages = [];
        const range = 2;

        pages.push(1);

        if (currentPage > range + 2) {
            pages.push("...");
        }

        for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - range - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-xl">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">Map Data</h2>

            <div className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="p-3 border-2 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
                />
            </div>

            {filteredData.length > 0 && (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                            <tr>
                                {data[0].map((header, index) => (
                                    <th key={index} className="px-4 py-2 text-sm font-semibold text-center">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {getCurrentData().map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-blue-50 transition-colors">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border-t border-gray-200 px-4 py-3 text-sm text-center text-gray-700">
                                            {cell || 'N/A'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
                {/* Range Selector */}
                <div className="flex items-center gap-2">
                    <label htmlFor="range" className="text-lg text-gray-700">Select Range:</label>
                    <select
                        id="range"
                        value={displayRange}
                        onChange={handleRangeChange}
                        className="p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {getPagination().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === "number" && handlePageChange(page)}
                                className={`px-4 py-2 rounded-lg transition-all ${page === currentPage ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-100 text-blue-500 hover:bg-blue-200'}`}
                                disabled={page === "..."}>
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Map;
