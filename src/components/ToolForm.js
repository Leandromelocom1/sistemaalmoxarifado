import React, { useState } from 'react';
import { tw } from 'twind';
import Tabs from './Tabs';
import ConstructionForm from './ConstructionForm';
import ResponsibleForm from './ResponsibleForm';

const ToolForm = ({ addTool, addConstruction, constructions, addResponsible }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTool({ name, description, serialNumber, quantity });
      setName('');
      setDescription('');
      setSerialNumber('');
      setQuantity(1);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao adicionar ferramenta.');
    }
  };

  const toolForm = (
    <form onSubmit={handleSubmit} className={tw`space-y-4`}>
      <div>
        <label className={tw`block mb-2 text-sm font-bold`}>Nome da Ferramenta</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={tw`w-full px-3 py-2 border rounded-lg`}
          required
        />
      </div>
      <div>
        <label className={tw`block mb-2 text-sm font-bold`}>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={tw`w-full px-3 py-2 border rounded-lg`}
          required
        />
      </div>
      <div>
        <label className={tw`block mb-2 text-sm font-bold`}>Número de Série</label>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className={tw`w-full px-3 py-2 border rounded-lg`}
          required
        />
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
      {errorMessage && <p className={tw`text-red-500`}>{errorMessage}</p>}
      <button type="submit" className={tw`px-4 py-2 bg-blue-500 text-white rounded-lg`}>Adicionar Ferramenta</button>
    </form>
  );

  const constructionForm = <ConstructionForm addConstruction={addConstruction} />;
  const responsibleForm = <ResponsibleForm addResponsible={addResponsible} />;

  return (
    <Tabs
      tabs={[
        { label: 'Cadastro de Ferramentas', content: toolForm },
        { label: 'Cadastro de Obras', content: constructionForm },
        { label: 'Cadastro de Responsáveis', content: responsibleForm },
      ]}
    />
  );
};

export default ToolForm;
