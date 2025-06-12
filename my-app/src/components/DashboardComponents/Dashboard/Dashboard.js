import React, { useState } from 'react'; 
import './Dashboard.css';
import Sidebar from '../../SidebarComponents/Sidebar/Sidebar.js';
import MenuHub from '../MenuHub/MenuHub.js';
import DashboardScreen from '../../DashboardContentComponents/DashboardScreen.js';

const Dashboard = () => {
  
  const [isMenuHubDisplayed, setIsMenuHubDisplayed] = useState(false);
  const [isSettingsMenuDisplayed, setIsSettingsMenuDisplayed] = useState(false);
  const [currentActive, setCurrentActive] = useState(1);

  return (
    <div className='dashboard-container'>
        <Sidebar setIsMenuHubDisplayed={setIsMenuHubDisplayed} isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed} currentActive={currentActive} setCurrentActive={setCurrentActive}/>
        <MenuHub isMenuHubDisplayed={isMenuHubDisplayed} setIsMenuHubDisplayed={setIsMenuHubDisplayed} isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed}/>
        <DashboardScreen currentActive={currentActive} setCurrentActive={setCurrentActive} />
    </div>
  )
}

export default Dashboard;
