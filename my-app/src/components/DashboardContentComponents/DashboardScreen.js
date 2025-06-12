import React from "react";
import DashboardHome from './DashboardHome/DashboardHome';

import './DashboardScreen.css';

const DashboardScreen = ({currentActive, setCurrentActive}) => {

    return (
        <div className="screen-container">
            <DashboardHome currentActive={currentActive}/>
        </div>
    )
}

export default DashboardScreen;