import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import Sidebtns from '../Sidebtns/Sidebtns';
import SidebarProfile from '../SidebarProfile/SidebarProfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({setIsMenuHubDisplayed, isSettingsMenuDisplayed, setIsSettingsMenuDisplayed, currentActive, setCurrentActive, refs, setIsObserving }) => {

    const [isDisplayed, setIsDisplayed] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleSidebarBtn = () => {
        setIsDisplayed(!isDisplayed);
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    })

    return (    
        <div className={`sidebar-container ${isDisplayed || windowWidth >= 800 ? '' : 'shrink'}`}>
            <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={handleSidebarBtn} />
            <div className={`sidebar-content ${isDisplayed || windowWidth >= 800 ? '' : 'hidden'} `}>
                <Sidebtns currentActive={currentActive} setCurrentActive={setCurrentActive} refs={refs} setIsObserving={setIsObserving}/>
                <SidebarProfile setIsMenuHubDisplayed={setIsMenuHubDisplayed} isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed}/>
            </div>
        </div>
    );
}

export default Sidebar;