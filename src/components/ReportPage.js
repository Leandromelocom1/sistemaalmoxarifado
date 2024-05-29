import React from 'react';
import { tw } from 'twind';

const ReportPage = ({ checkedOutTools }) => {
  return (
    <div>
      <h2 className={tw`text-xl font-bold mb-4`}>Relatório de Ferramentas Retiradas</h2>
      <table className={tw`min-w-full bg-white`}>
        <thead>
          <tr>
            <th className={tw`py-2`}>Ferramenta</th>
            <th className={tw`py-2`}>Quantidade Retirada</th>
            <th className={tw`py-2`}>Responsável</th>
            <th className={tw`py-2`}>Data de Saída</th>
            <th className={tw`py-2`}>Quantidade Devolvida</th>
            <th className={tw`py-2`}>Data de Devolução</th>
          </tr>
        </thead>
        <tbody>
          {checkedOutTools.map((tool, index) => (
            <tr key={index} className={index % 2 === 0 ? tw`bg-gray-100` : tw`bg-white`}>
              <td className={tw`py-2 px-4`}>{tool.name}</td>
              <td className={tw`py-2 px-4`}>{tool.quantity}</td>
              <td className={tw`py-2 px-4`}>{tool.responsible}</td>
              <td className={tw`py-2 px-4`}>{new Date(tool.date).toLocaleDateString()}</td>
              <td className={tw`py-2 px-4`}>{tool.returnQuantity}</td>
              <td className={tw`py-2 px-4`}>{tool.returnDate ? new Date(tool.returnDate).toLocaleDateString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
