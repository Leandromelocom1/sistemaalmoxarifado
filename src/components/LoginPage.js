import React, { useState } from 'react';
import { tw } from 'twind';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className={tw`min-h-screen flex items-center justify-center`}>
      <div className={tw`w-full max-w-md bg-white bg-opacity-75 p-8 rounded-lg shadow-md backdrop-filter backdrop-blur-lg`}>
        <div className={tw`flex justify-center mb-6`}>
          <img src={require('../assets/logo.png')} alt="Logo" className={tw`w-16 h-16`} />
        </div>
        <form onSubmit={handleSubmit} className={tw`space-y-4`}>
          <div>
            <label className={tw`block mb-2 text-sm font-bold`}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={tw`w-full px-3 py-2 border rounded-lg`}
              required
            />
          </div>
          <div>
            <label className={tw`block mb-2 text-sm font-bold`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={tw`w-full px-3 py-2 border rounded-lg`}
              required
            />
          </div>
          {errorMessage && <p className={tw`text-red-500`}>{errorMessage}</p>}
          <button type="submit" className={tw`w-full px-4 py-2 bg-blue-500 text-white rounded-lg`}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
