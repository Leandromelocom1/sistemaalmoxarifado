import React, { useState } from 'react';
import { tw } from 'twind';

const CategoryForm = ({ addCategory }) => {
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      addCategory(category);
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={tw`space-y-4`}>
      <div>
        <label className={tw`block mb-2 text-sm font-bold`}>New Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={tw`w-full px-3 py-2 border rounded-lg`}
          required
        />
      </div>
      <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
