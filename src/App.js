import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import ToolForm from './components/ToolForm';
import LoginPage from './components/LoginPage';
import StockPage from './components/StockPage';
import MaintenancePage from './components/MaintenancePage';
import WelcomePage from './components/WelcomePage';
import { tw } from 'twind';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tools, setTools] = useState([]);
  const [constructions, setConstructions] = useState([]);
  const [checkedOutTools, setCheckedOutTools] = useState([]);
  const [maintenanceTools, setMaintenanceTools] = useState([]);
  const [responsibles, setResponsibles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const toolsResponse = await fetch('http://localhost:5000/api/tools');
        const toolsData = await toolsResponse.json();
        setTools(toolsData);

        const responsiblesResponse = await fetch('http://localhost:5000/api/responsibles');
        const responsiblesData = await responsiblesResponse.json();
        setResponsibles(responsiblesData);

        const constructionsResponse = await fetch('http://localhost:5000/api/constructions');
        const constructionsData = await constructionsResponse.json();
        setConstructions(constructionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/welcome');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const addTool = async (tool) => {
    try {
      const response = await fetch('http://localhost:5000/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tool)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const newTool = await response.json();
      setTools([...tools, newTool]);
    } catch (error) {
      console.error('Error adding tool:', error);
    }
  };

  const addConstruction = async (construction) => {
    try {
      const response = await fetch('http://localhost:5000/api/constructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(construction)
      });

      const newConstruction = await response.json();
      setConstructions([...constructions, newConstruction]);
    } catch (error) {
      console.error('Error adding construction:', error);
    }
  };

  const addResponsible = async (responsible) => {
    try {
      const response = await fetch('http://localhost:5000/api/responsibles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(responsible)
      });

      const newResponsible = await response.json();
      setResponsibles([...responsibles, newResponsible]);
    } catch (error) {
      console.error('Error adding responsible:', error);
    }
  };

  const checkoutTool = async (toolName, responsible, quantity, construction) => {
    try {
      const response = await fetch('http://localhost:5000/api/tools/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ toolName, responsible, quantity, construction })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const newTransaction = await response.json();
      setCheckedOutTools([...checkedOutTools, newTransaction]);
      const updatedTools = tools.map(t => t.name === toolName ? { ...t, quantity: t.quantity - quantity } : t);
      setTools(updatedTools);
    } catch (error) {
      console.error('Error checking out tool:', error);
    }
  };

  const returnTool = async (toolName, responsible, quantity) => {
    try {
      const response = await fetch('http://localhost:5000/api/tools/return', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ toolName, responsible, quantity })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedTransaction = await response.json();
      const updatedCheckedOutTools = checkedOutTools.map(t => t._id === updatedTransaction._id ? updatedTransaction : t);
      setCheckedOutTools(updatedCheckedOutTools);

      const stockTool = tools.find(t => t.name === toolName);
      if (stockTool) {
        const updatedTools = tools.map(t => t.name === toolName ? { ...t, quantity: t.quantity + quantity } : t);
        setTools(updatedTools);
      }
    } catch (error) {
      console.error('Error returning tool:', error);
    }
  };

  const completeMaintenance = async (toolName, solution) => {
    const tool = maintenanceTools.find(t => t.name === toolName);
    if (tool) {
      setTools([...tools, tool]);
      setMaintenanceTools(maintenanceTools.filter(t => t.name !== toolName));
      try {
        await fetch(`http://localhost:5000/api/tools/${tool._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quantity: tool.quantity })
        });
      } catch (error) {
        console.error('Error updating tool quantity:', error);
      }
    }
  };

  return (
    <div className={tw`min-h-screen p-8`}>
      {isAuthenticated && (
        <nav className={tw`mb-4 flex justify-between items-center`}>
          <div>
            <Link to="/tools" className={tw`mr-4 text-blue-500`}>Cadastro de Ferramentas</Link>
            <Link to="/stock" className={tw`mr-4 text-blue-500`}>Estoque</Link>
            <Link to="/maintenance" className={tw`text-blue-500`}>Manutenção de Ferramentas</Link>
          </div>
          <button onClick={handleLogout} className={tw`px-4 py-2 bg-red-500 text-white rounded-lg`}>Logoff</button>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/welcome"
          element={isAuthenticated ? <WelcomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/tools"
          element={isAuthenticated ? <ToolRegistrationPage addTool={addTool} addConstruction={addConstruction} constructions={constructions} addResponsible={addResponsible} /> : <Navigate to="/" />}
        />
        <Route
          path="/stock"
          element={isAuthenticated ? <StockPage tools={tools} checkedOutTools={checkedOutTools} checkoutTool={checkoutTool} returnTool={returnTool} responsibles={responsibles} constructions={constructions} /> : <Navigate to="/" />}
        />
        <Route
          path="/maintenance"
          element={isAuthenticated ? <MaintenancePage maintenanceTools={maintenanceTools} completeMaintenance={completeMaintenance} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

const ToolRegistrationPage = ({ addTool, addConstruction, constructions, addResponsible }) => {
  return (
    <div>
      <h1 className={tw`text-2xl font-bold mb-6`}>Tool Registration System</h1>
      <ToolForm addTool={addTool} addConstruction={addConstruction} constructions={constructions} addResponsible={addResponsible} />
    </div>
  );
};

export default App;
