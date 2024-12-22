import React, { useState, useEffect } from 'react';
import SalesDatatable from '../Sub/SalesDatatable'; // Import SalesDatatable component

function Sales() {
  // Get initial tab from the hash in URL or set default
  const getInitialTab = () => window.location.hash.replace('#', '') || 'amazonOni';

  const [selectedTab, setSelectedTab] = useState(getInitialTab()); // Default tab from URL hash

  // Effect to update URL hash when the selected tab changes
  useEffect(() => {
    if (selectedTab) {
      window.location.hash = selectedTab;
    }
  }, [selectedTab]);

  // Function to render the content based on selected tab
  const renderTabContent = () => {
    return <SalesDatatable selectedTab={selectedTab} />;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Manage Sales Data</h1>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        {/* Tab Buttons with dynamic IDs */}
        {['amazonOni', 'amazonComet', 'flipkartOni', 'flipkartComet', 'shopify', 'myntra', 'others'].map((tabId) => (
          <button
            key={tabId}
            onClick={() => setSelectedTab(tabId)}
            className={`px-6 py-3 text-lg font-medium rounded-t-lg transition-all duration-300 ease-in-out transform 
              ${selectedTab === tabId 
                ? 'bg-teal-600 text-white shadow-lg' 
                : 'bg-teal-100 text-teal-700 hover:bg-teal-200 hover:shadow-md'} 
              hover:scale-105`}
          >
            {tabId.replace(/([A-Z])/g, ' $1').toUpperCase()} {/* Add spaces between camelCase */}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-500 ease-in-out">{renderTabContent()}</div>
    </div>
  );
}

export default Sales;
