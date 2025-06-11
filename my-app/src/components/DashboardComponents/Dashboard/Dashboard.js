import React, { useState } from 'react'; 
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar.js';
import MenuHub from '../MenuHub/MenuHub.js';

const Dashboard = () => {

  const [isMenuHubDisplayed, setIsMenuHubDisplayed] = useState(false);
  const [isSettingsMenuDisplayed, setIsSettingsMenuDisplayed] = useState(false);

  return (
    <div className='dashboard-container'>
        <Sidebar setIsMenuHubDisplayed={setIsMenuHubDisplayed} isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed}/>
        <MenuHub isMenuHubDisplayed={isMenuHubDisplayed} setIsMenuHubDisplayed={setIsMenuHubDisplayed} isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed}/>
    </div>
  )
}

export default Dashboard;
