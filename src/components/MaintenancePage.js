import React, { useState } from 'react';
import { tw } from 'twind';

const MaintenancePage = ({ maintenanceTools, completeMaintenance }) => {
  const [selectedTool, setSelectedTool] = useState('');
  const [solution, setSolution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCompleteMaintenance = (e) => {
    e.preventDefault();
    if (selectedTool && solution) {
      completeMaintenance(selectedTool, solution);
      setSelectedTool('');
      setSolution('');
      setErrorMessage('');
    } else {
      setErrorMessage('Selecione uma ferramenta e forneça a solução.');
    }
  };

  return (
    <div>
      <h1 className={tw`text-2xl font-bold mb-6`}>Manutenção de Ferramentas</h1>
      <form onSubmit={handleCompleteMaintenance} className={tw`space-y-4`}>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Selecionar Ferramenta</label>
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Selecione uma ferramenta</option>
            {maintenanceTools.map((tool, index) => (
              <option key={index} value={tool.name}>{tool.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Solução</label>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          />
        </div>
        {errorMessage && <p className={tw`text-red-500`}>{errorMessage}</p>}
        <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>Concluir Manutenção</button>
      </form>
      <div className={tw`mt-8`}>
        <h2 className={tw`text-xl font-bold mb-4`}>Ferramentas em Manutenção</h2>
        <ul className={tw`space-y-2`}>
          {maintenanceTools.map((tool, index) => (
            <li key={index} className={tw`p-4 bg-white rounded-lg shadow`}>
              <h3 className={tw`text-lg font-semibold`}>{tool.name}</h3>
              <p className={tw`text-gray-700`}>{tool.description}</p>
              <p className={tw`text-gray-500`}>{tool.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaintenancePage;
