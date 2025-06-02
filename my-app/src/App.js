import { useState, useRef } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import Dashboard from './components/DashboardComponents/Dashboard/Dashboard.js'
import LoginOperations from './components/LoginComponents/LoginOperations.js';
import ResetPassword from './resetPassword/reset.js';
import PopUp from './components/Alerts/PopUpAlert/PopUp.js';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="main-container">
      <Router>
        <Routes>
          <Route path='/' element={<LoginOperations setIsLogged={setIsLogged} />} />

          <Route path='/reset-password' element={<ResetPassword />} />

          <Route path='/logged' element={ <Dashboard />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
