import React from "react";
import DashboardHome from './DashboardHome/DashboardHome';

import './DashboardScreen.css';

const DashboardScreen = ({currentActive, setCurrentActive}) => {
    console.log(currentActive)

    return (
        <div className="screen-container">
            <DashboardHome currentActive={currentActive} className={currentActive === 1 ? '' : 'hidden'}/>
        </div>
    )
}

export default DashboardScreen;