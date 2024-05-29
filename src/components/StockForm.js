import React, { useState } from 'react';
import { tw } from 'twind';

const StockForm = ({ tools, checkedOutTools, checkoutTool, returnTool, responsibles }) => {
  const [toolName, setToolName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [responsible, setResponsible] = useState('');
  const [project, setProject] = useState('');
  const [isExternal, setIsExternal] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    checkoutTool(toolName, responsible, quantity, project, isExternal);
    setToolName('');
    setQuantity(1);
    setResponsible('');
    setProject('');
    setIsExternal(false);
  };

  const handleReturn = (e) => {
    e.preventDefault();
    returnTool(toolName, false, quantity);
    setToolName('');
    setQuantity(1);
  };

  return (
    <div>
      <h2 className={tw`text-xl font-bold mb-4`}>Saída de Ferramentas</h2>
      <form onSubmit={handleCheckout} className={tw`space-y-4`}>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Ferramenta</label>
          <select
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Selecione uma ferramenta</option>
            {tools.map((tool) => (
              <option key={tool._id} value={tool.name}>{tool.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
            min="1"
          />
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Responsável</label>
          <select
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Selecione um responsável</option>
            {responsibles.map((resp) => (
              <option key={resp._id} value={resp.name}>{resp.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Obra</label>
          <input
            type="text"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            disabled={!isExternal}
            required={isExternal}
          />
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Obra Externa</label>
          <input
            type="checkbox"
            checked={isExternal}
            onChange={(e) => setIsExternal(e.target.checked)}
            className={tw`ml-2`}
          />
        </div>
        <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>Registrar Saída</button>
      </form>

      <h2 className={tw`text-xl font-bold mt-8 mb-4`}>Devolução de Ferramentas</h2>
      <form onSubmit={handleReturn} className={tw`space-y-4`}>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Ferramenta</label>
          <select
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Selecione uma ferramenta</option>
            {checkedOutTools.map((tool) => (
              <option key={tool._id} value={tool.name}>{tool.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
            min="1"
          />
        </div>
        <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>Registrar Devolução</button>
      </form>
    </div>
  );
};

export default StockForm;
