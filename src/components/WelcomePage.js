import React from 'react';
import { tw } from 'twind';

const WelcomePage = () => {
  return (
    <div className={tw`min-h-screen flex items-center justify-center`}>
      <div className={tw`w-full max-w-md bg-white bg-opacity-75 p-8 rounded-lg shadow-md text-center backdrop-filter backdrop-blur-lg`}>
        <h1 className={tw`text-3xl font-bold mb-6`}>Bem-vindo ao Sistema de Gerenciamento de Ferramentas</h1>
        <p className={tw`text-lg mb-4`}>Escolha uma opção no menu para começar.</p>
      </div>
    </div>
  );
};

export default WelcomePage;
