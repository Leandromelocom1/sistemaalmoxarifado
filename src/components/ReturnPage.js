import React, { useState } from 'react';
import { tw } from 'twind';

const ReturnPage = ({ checkedOutTools, returnTool }) => {
  const [selectedTool, setSelectedTool] = useState('');
  const [isDefective, setIsDefective] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleReturn = (e) => {
    e.preventDefault();
    if (selectedTool && quantity > 0) {
      returnTool(selectedTool, isDefective, quantity);
      setSelectedTool('');
      setIsDefective(false);
      setQuantity(1);
    }
  };

  return (
    <div>
      <h1 className={tw`text-2xl font-bold mb-6`}>Return Tool</h1>
      <form onSubmit={handleReturn} className={tw`space-y-4`}>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Select Tool</label>
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Select a tool</option>
            {checkedOutTools.map((tool, index) => (
              <option key={index} value={tool.name}>{tool.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Defective</label>
          <input
            type="checkbox"
            checked={isDefective}
            onChange={(e) => setIsDefective(e.target.checked)}
            className={tw`mr-2`}
          />
          Yes
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required                                                                                                                                                                                                                                                                    
            min="1"
          />
        </div>
        <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>
          Return T                                                      
        </button>
      </form>
    </div>
  );
};

export default ReturnPage;
