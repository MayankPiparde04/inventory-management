import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import filee from '../assets/Inventory.xlsx';

const CategoryList = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
                    setFilteredData(jsonData);
                } else {
                    console.error(`Sheet with name "${sheetName}" not found.`);
                }
            })
            .catch((error) => console.error('Error loading the Excel file:', error));
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter the data based on search query
        const filtered = data.filter((row) =>
            row.some((cell) => cell.toString().toLowerCase().includes(query.toLowerCase()))
        );

        setFilteredData(filtered);
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Excel Data Viewer</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {filteredData.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                {data[0].map((header, index) => (
                                    <th key={index} className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.slice(1,100).map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                                            {cell || 'N/A'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
