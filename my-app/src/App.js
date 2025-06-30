import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import Dashboard from './components/DashboardComponents/Dashboard/Dashboard.js'
import LoginOperations from './components/LoginComponents/LoginOperations.js';
import ResetPassword from './resetPassword/reset.js';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [colorMode, setColorMode] = useState("dark");
  const [languageVersion, setLanguageVersion] = useState('PL');

  useEffect(() => {
    const savedMode = localStorage.getItem('colorMode');
    if (savedMode) {
      setColorMode(savedMode);
    }

    const savedLanguage = localStorage.getItem('languageVersion');
    if (savedLanguage) {
      setLanguageVersion(savedLanguage);
    }
  }, []);


  return (
    <div className={`main-container ${colorMode}`}>
      <Router>
        <Routes>
          <Route path='/' element={<LoginOperations setIsLogged={setIsLogged} colorMode={colorMode} languageVersion={languageVersion}/>} />

          <Route path='/reset-password' element={<ResetPassword />} />

          <Route path='/logged' element={ <Dashboard />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
