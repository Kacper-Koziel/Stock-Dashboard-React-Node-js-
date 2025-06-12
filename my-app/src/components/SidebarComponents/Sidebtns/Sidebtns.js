import { faBell, faChartBar, faChartColumn, faHome, faTrophy, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './Sidebtns.css'

const Sidebtns = ({currentActive, setCurrentActive}) => {

    return (
        <div className="side-btns-container">
            <span className="active-meter" style={{ top: `${(currentActive - 1) * 20}%` }}></span>
            <div className={`side-btn ${currentActive === 1 ? 'active' : ''}`} onClick={() => setCurrentActive(1)}>
                <FontAwesomeIcon icon={faHome} className="menu-btn-icon"/>  
                <h3>Home</h3>
            </div>
            <div className={`side-btn ${currentActive === 2 ? 'active' : ''}`} onClick={() => setCurrentActive(2)}>
                <FontAwesomeIcon icon={faTrophy} className="menu-btn-icon"/>
                <h3>Trending</h3>
            </div>
            <div className={`side-btn ${currentActive === 3 ? 'active' : ''}`} onClick={() => setCurrentActive(3)}>
                <FontAwesomeIcon icon={faChartColumn} className="menu-btn-icon"/> 
                <h3>Charts</h3>
            </div>
            <div className={`side-btn ${currentActive === 4 ? 'active' : ''}`} onClick={() => setCurrentActive(4)}>
                <FontAwesomeIcon icon={faWallet} className="menu-btn-icon"/>
                <h3>Wallet</h3>
            </div>
            <div className={`side-btn ${currentActive === 5 ? 'active' : ''}`} onClick={() => setCurrentActive(5)}>
                <FontAwesomeIcon icon={faBell} className="menu-btn-icon"/>
                <h3>Notifications</h3>
            </div>
        </div>
    );
}

export default Sidebtns;