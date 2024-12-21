import React, { useState } from 'react';

function AddAmazonOni() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');

  // Updated categories and subcategories
  const categories = [
    'STK155', 'BIN617', 'BIN2029', 'BIN1977', 'BIN1905', 'BIN1907',
    'BIN1732', 'BIN1734', 'BIN998', 'EYEJEW028'
  ];

  // Subcategories for each category
  const subcategories = {
    STK155: ['STK155-A', 'STK155-B', 'STK155-C'],
    BIN617: [],
    BIN2029: [], // No subcategories for BIN2029
    BIN1977: ['BIN1977-A', 'BIN1977-B', 'BIN1977-C'],
    BIN1905: [],
    BIN1907: ['BIN1907-A', 'BIN1907-B', 'BIN1907-C'],
    BIN1732: ['BIN1732-A', 'BIN1732-B', 'BIN1732-C'],
    BIN1734: ['BIN1734-A', 'BIN1734-B', 'BIN1734-C'],
    BIN998: ['BIN998-A', 'BIN998-B', 'BIN998-C'],
    EYEJEW028: ['EYEJEW028-A', 'EYEJEW028-B', 'EYEJEW028-C'],
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  // Handle sub-category change
  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { category, subcategory, quantity, date };
    console.log('Submitted Data:', data);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Add Amazon ONI</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          <div className="mb-6">
            <label htmlFor="subcategory" className="block text-lg font-medium text-gray-700">Sub-Category</label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={handleSubcategoryChange}
              className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!category} // Disable subcategory if no category is selected
            >
              <option value="">Select Sub-Category</option>
              {category && subcategories[category]?.length > 0 ? (
                subcategories[category].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))
              ) : (
                <option value={category}>{category}</option> // Show the category itself if no subcategories
              )}
            </select>
          </div>

          {/* Date Field */}
          <div className="mb-6">
            <label htmlFor="date" className="block text-lg font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quantity Field */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Quantity"
              min="1"
            />
          </div>

        </div>
        {/* Submit Button */}
        <div className='justify-center items-center flex'>
          <button
            type="submit"
            className="w-36 text-2xl bg-gray-600 text-white py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAmazonOni;
