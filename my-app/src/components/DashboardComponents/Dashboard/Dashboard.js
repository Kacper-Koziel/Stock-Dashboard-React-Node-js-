import React, { useState } from 'react'; 
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar.js';
import SettingsMenu from '../SettingsMenu/SettingsMenu.js';

const Dashboard = () => {

  const [isSettingsMenuDisplayed, setIsSettingsMenuDisplayed] = useState(false);

  return (
    <div className='dashboard-container'>
        <Sidebar setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed} />
        <SettingsMenu isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed} />
    </div>
  )
}

export default Dashboard;
