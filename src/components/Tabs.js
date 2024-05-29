import React, { useState } from 'react';
import { tw } from 'twind';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className={tw`flex border-b`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={tw`px-4 py-2 ${index === activeTab ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={tw`p-4`}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
