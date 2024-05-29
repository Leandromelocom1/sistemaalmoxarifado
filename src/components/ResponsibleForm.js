import React, { useState } from 'react';
import { tw } from 'twind';

const ResponsibleForm = ({ addResponsible }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addResponsible({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className={tw`space-y-4`}>
      <div>
        <label className={tw`block mb-2 text-sm font-bold`}>Nome do Responsável</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={tw`w-full px-3 py-2 border rounded-lg`}
          required
        />
      </div>
      <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>Adicionar Responsável</button>
    </form>
  );
};

export default ResponsibleForm;
