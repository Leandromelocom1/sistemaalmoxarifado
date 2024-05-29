import React, { useState } from 'react';
import { tw } from 'twind';

const CheckoutForm = ({ tools = [], checkoutTool, responsibles = [], constructions = [] }) => {
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedResponsible, setSelectedResponsible] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedConstruction, setSelectedConstruction] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    const construction = isInternal ? 'Interno' : selectedConstruction;
    checkoutTool(selectedTool, selectedResponsible, quantity, construction);
    setSelectedTool('');
    setSelectedResponsible('');
    setQuantity(1);
    setSelectedConstruction('');
    setIsInternal(false);
  };

  return (
    <div>
      <h1 className={tw`text-2xl font-bold mb-6`}>Saída de Ferramentas</h1>
      <form onSubmit={handleCheckout} className={tw`space-y-4`}>
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Selecionar Ferramenta</label>
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required
          >
            <option value="" disabled>Selecione uma ferramenta</option>
            {tools.map((tool, index) => (
              <option key={index} value={tool.name}>{tool.name}</option>
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
        <div>
          <label className={tw`block mb-2 text-sm font-bold`}>Obra</label>
          <select
            value={selectedConstruction}
            onChange={(e) => setSelectedConstruction(e.target.value)}
            className={tw`w-full px-3 py-2 border rounded-lg`}
            required={!isInternal}
            disabled={isInternal}
          >
            <option value="" disabled>Selecione uma obra</option>
            {constructions.map((construction, index) => (
              <option key={index} value={construction.client}>{construction.client}</option>
            ))}
          </select>
        </div>
        <div className={tw`flex items-center`}>
          <input
            type="checkbox"
            checked={isInternal}
            onChange={(e) => setIsInternal(e.target.checked)}
            className={tw`mr-2`}
          />
          <label className={tw`text-sm font-bold`}>Uso Interno</label>
        </div>
        <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>Registrar Saída</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
