import React, { useState } from 'react';
import AddAmazonOni from '../Sub/AddAmazonOni';
import AddAmazonComet from '../Sub/AddAmazonComet';

function AddItem() {
  const [selectedTab, setSelectedTab] = useState('amazonOnI');

  // Function to render the content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'amazonOnI':
        return <AddAmazonOni />;
      case 'amazonComet':
        return <AddAmazonComet />;
      case 'flipkartOnI':
        return <div>Flipkart ONI Content</div>;
      case 'flipkartComet':
        return <div>Flipkart Comet Content</div>;
      case 'shopify':
        return <div>Shopify Content</div>;
      case 'myntra':
        return <div>Myntra Content</div>;
      case 'others':
        return <div>Other Platforms Content</div>;
      default:
        return <div>Choose a tab</div>;
    }
  };

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Add any Items</h1>

      {/* Tab Navigation */}
      <div className="grid lg:grid-cols-7 gap-2 ">
        <button
          onClick={() => setSelectedTab('amazonOnI')}
          className={`px-4 py-1 rounded-t ${selectedTab === 'amazonOnI' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
        >
          Amazon ONI
        </button>
        <button
          onClick={() => setSelectedTab('amazonComet')}
          className={`px-4 py-1 rounded-t ${selectedTab === 'amazonComet' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
        >
          Amazon Comet
        </button>
        <button
          onClick={() => setSelectedTab('flipkartOnI')}
          className={`px-4 py-1 rounded-t ${selectedTab === 'flipkartOnI' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
        >
          Flipkart ONI
        </button>
        <button
          onClick={() => setSelectedTab('flipkartComet')}
          className={`px-4 py-1 rounded-t ${selectedTab === 'flipkartComet' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
        >
          Flipkart Comet
        </button>
        <button
          onClick={() => setSelectedTab('shopify')}
          className={`px-4 py-1 rounded-t ${selectedTab === 'shopify' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
        >
          Shopify
        </button>
        <button
          onClick={() => setSelectedTab('myntra')}
          className={`px-4 py-1 rounded-t ${selectedTab === 'myntra' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
        >
          Myntra
        </button>
        <button
          onClick={() => setSelectedTab('others')}
          className={`px-4 py-1 rounded-t ${selectedTab === 'others' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
        >
          Others
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-gray-100 h-full border border-t-gray-800 border-gray-300 rounded-b-lg">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default AddItem;
