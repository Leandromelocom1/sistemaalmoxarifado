import React, { useState } from 'react';
import { tw } from 'twind';

const ConstructionForm = ({ addConstruction }) => {
  const [client, setClient] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addConstruction({ client, address });
    setClient('');
    setAddress('');
  };

  return (
    <form onSubmit={handleSubmit} className={tw`space-y-4`}>
      <div>
        <label className={tw`block mb-2 text-sm font-bold`}>Cliente</label>
        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className={tw`w-full px-3 py-2 border rounded-lg`}
          required
        />
      </div>
      <div>
        <label className={tw`block mb-2 text-sm font-bold`}>Endereço</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={tw`w-full px-3 py-2 border rounded-lg`}
          required
        />
      </div>
      <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>Adicionar Obra</button>
    </form>
  );
};

export default ConstructionForm;
