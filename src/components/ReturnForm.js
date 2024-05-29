import React, { useState } from 'react';
import { tw } from 'twind';

const ReturnForm = ({ checkedOutTools = [], returnTool, responsibles = [] }) => {
  const [selectedTool, setSelectedTool] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedResponsible, setSelectedResponsible] = useState('');

  const handleReturn = (e) => {
    e.preventDefault();
    const tool = checkedOutTools.find(tool => tool.toolName === selectedTool && tool.responsible === selectedResponsible);
    if (tool) {
      returnTool(tool.toolName, selectedResponsible, quantity);
      setSelectedTool('');
      setSelectedResponsible('');
      setQuantity(1);
    } else {
      alert('Ferramenta não encontrada para o responsável selecionado.');
    }
  };

  return (
    <div>
      <h1 className={tw`text-2xl font-bold mb-6`}>Devolução de Ferramentas</h1>
      <form onSubmit={handleReturn} className={tw`space-y-4`}>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Ferramenta</label>
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Selecione uma ferramenta</option>
            {checkedOutTools.map((tool, index) => (
              <option key={index} value={tool.toolName}>{tool.toolName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Responsável</label>
          <select
            value={selectedResponsible}
            onChange={(e) => setSelectedResponsible(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Selecione um responsável</option>
            {responsibles.map((responsible, index) => (
              <option key={index} value={responsible.name}>{responsible.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Quantidade</label>
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
        <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>Registrar Devolução</button>
      </form>
    </div>
  );
};

export default ReturnForm;
