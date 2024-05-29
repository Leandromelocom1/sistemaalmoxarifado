import React, { useState } from 'react';
import { tw } from 'twind';

const CheckoutPage = ({ tools, checkoutTool, responsibles }) => {
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedResponsible, setSelectedResponsible] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (selectedTool && selectedResponsible && quantity > 0) {
      checkoutTool(selectedTool, selectedResponsible, quantity);
      setSelectedTool('');
      setSelectedResponsible('');
      setQuantity(1);
    }
  };

  return (
    <div>
      <h1 className={tw`text-2xl font-bold mb-6`}>Checkout Tool</h1>
      <form onSubmit={handleCheckout} className={tw`space-y-4`}>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Select Tool</label>
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Select a tool</option>
            {tools.map((tool, index) => (
              <option key={index} value={tool.name}>{tool.name} (Serial Number: {tool.serialNumber})</option>
            ))}
          </select>
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Select Responsible</label>
          <select
            value={selectedResponsible}
            onChange={(e) => setSelectedResponsible(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Select a responsible</option>
            {responsibles.map((responsible, index) => (
              <option key={index} value={responsible.name}>{responsible.name}</option>
            ))}
          </select>
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
          Checkout Tool
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
