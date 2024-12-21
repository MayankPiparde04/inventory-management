import React, { useState } from 'react';

const CategoryPage = () => {
  // Predefined categories and subcategories
  const [categories, setCategories] = useState([
    { name: 'STK155', subcategories: ['STK155-A', 'STK155-B', 'STK155-C'] },
    { name: 'BIN617', subcategories: [] },
    { name: 'BIN2029', subcategories: [] },
    { name: 'BIN1977', subcategories: ['BIN1977-A', 'BIN1977-B', 'BIN1977-C'] },
    { name: 'BIN1905', subcategories: [] },
    { name: 'BIN1907', subcategories: ['BIN1907-A', 'BIN1907-B', 'BIN1907-C'] },
    { name: 'BIN1732', subcategories: ['BIN1732-A', 'BIN1732-B', 'BIN1732-C'] }
  ]);

  // State for category and subcategory management
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');

  // Add new category to the list
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert('Category name is required');
      return;
    }
    if (categories.find((category) => category.name === newCategory)) {
      alert('Category already exists');
      return;
    }
    // Add new category with empty subcategories array
    const newCategoryObj = { name: newCategory, subcategories: [] };
    setCategories([...categories, newCategoryObj]);
    setNewCategory('');
  };

  // Add subcategory to the selected category
  const handleAddSubcategory = () => {
    if (!newSubcategory.trim()) {
      alert('Subcategory name is required');
      return;
    }
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    // Update subcategories of the selected category
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.name === selectedCategory
          ? { ...category, subcategories: [...category.subcategories, newSubcategory] }
          : category
      )
    );
    setNewSubcategory('');
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Category and Subcategory Management</h2>

      <div className="flex gap-8 mb-6">
        {/* Add Category Section */}
        <div className="w-1/2">
          <h3 className="text-xl font-semibold mb-2">Add New Category</h3>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>

        {/* Add Subcategory Section */}
        <div className="w-1/2">
          <h3 className="text-xl font-semibold mb-2">Add Subcategory</h3>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            placeholder="Enter subcategory name"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          />

          <button
            onClick={handleAddSubcategory}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Add Subcategory
          </button>
        </div>
      </div>

      {/* Display Categories and their Subcategories in Table */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Categories and Subcategories</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Subcategories</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.subcategories.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {category.subcategories.map((sub, subIndex) => (
                        <li key={subIndex}>{sub}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No subcategories</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
