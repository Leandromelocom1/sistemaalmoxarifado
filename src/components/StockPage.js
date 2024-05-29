import React from 'react';
import { tw } from 'twind';
import Tabs from './Tabs';
import CheckoutForm from './CheckoutForm';
import ReturnForm from './ReturnForm';
import ReportPage from './ReportPage';

const StockPage = ({ tools = [], checkedOutTools = [], checkoutTool, returnTool, responsibles = [], constructions = [] }) => {
  const checkoutForm = (
    <CheckoutForm tools={tools} checkoutTool={checkoutTool} responsibles={responsibles} constructions={constructions} />
  );

  const returnForm = (
    <ReturnForm checkedOutTools={checkedOutTools} returnTool={returnTool} responsibles={responsibles} />
  );

  const reportPage = (
    <ReportPage checkedOutTools={checkedOutTools} />
  );

  return (
    <div>
      <h1 className={tw`text-2xl font-bold mb-6`}>Estoque de Ferramentas</h1>
      <Tabs
        tabs={[
          { label: 'Saída de Ferramentas', content: checkoutForm },
          { label: 'Devolução de Ferramentas', content: returnForm },
          { label: 'Relatório', content: reportPage },
        ]}
      />
    </div>
  );
};

export default StockPage;
