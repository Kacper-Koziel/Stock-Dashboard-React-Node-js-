import React from "react";
import DashboardHome from './DashboardHome/DashboardHome';
import DashboardTrending from "./DashboardTrending/DashboardTrending";

import './DashboardScreen.css';

const DashboardScreen = ({currentActive, setCurrentActive, refs}) => {

    return (
        <div className="screen-container">
            <DashboardHome currentActive={currentActive} refs={refs}/>
            <DashboardTrending currentActive={currentActive} refs={refs}/>
        </div>
    )
}

export default DashboardScreen;