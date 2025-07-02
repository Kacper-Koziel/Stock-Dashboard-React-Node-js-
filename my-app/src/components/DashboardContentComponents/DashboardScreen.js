import React from "react";
import DashboardHome from './DashboardHome/DashboardHome';
import DashboardTrending from "./DashboardTrending/DashboardTrending";

import './DashboardScreen.css';
import DashboardCharts from "./DashboardCharts/DashboardCharts";
import DashboardComparison from "./DashboardComparison/DashboardComparison";

const DashboardScreen = ({currentActive, setCurrentActive, refs, colorMode, languageVersion}) => {

    return (
        <div className="screen-container">
            <DashboardHome currentActive={currentActive} refs={refs} colorMode={colorMode} languageVersion={languageVersion}/>
            <DashboardTrending currentActive={currentActive} refs={refs} colorMode={colorMode} languageVersion={languageVersion}/>
            <DashboardCharts currentActive={currentActive} refs={refs} colorMode={colorMode} languageVersion={languageVersion}/>
            <DashboardComparison currentActive={currentActive} refs={refs} colorMode={colorMode} languageVersion={languageVersion}/>
        </div>
    )
}

export default DashboardScreen;