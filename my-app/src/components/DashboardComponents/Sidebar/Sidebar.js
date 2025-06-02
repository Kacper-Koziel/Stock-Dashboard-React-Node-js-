import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import Sidebtns from '../Sidebtns/Sidebtns';
import SidebarProfile from '../SidebarProfile/SidebarProfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({setIsSettingsMenuDisplayed}) => {

    const [isDispleyed, setIsDisplayed] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleSidebarBtn = () => {
        setIsDisplayed(!isDispleyed);
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    })

    return (    
        <div className={`sidebar-container`}>
            <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={handleSidebarBtn} />
            <div className={`sidebar-content ${isDispleyed || windowWidth >= 800 ? '' : 'hidden'} `}>
                <Sidebtns />
                <SidebarProfile setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed} />
            </div>
        </div>
    );
}

export default Sidebar;