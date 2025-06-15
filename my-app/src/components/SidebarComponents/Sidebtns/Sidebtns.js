import { faBell, faChartBar, faChartColumn, faHome, faRightFromBracket, faTrophy, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import './Sidebtns.css'

const Sidebtns = ({currentActive, setCurrentActive, refs, setIsObserving}) => {

    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const navigate = useNavigate();

    const scrollTo = (index) => {
        if(currentActive === index + 1)
        {
            return;
        }

        setIsObserving(false); 
        setCurrentActive(index + 1);
        refs[index].ref.current.scrollIntoView({behavior: 'smooth'});
        setTimeout(() => {
            setIsObserving(true);
        }, 500);
    }

    const logout = async () => {
        try 
        {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            })

            if(response.status === 200)
            {
                navigate('../')
            }
        }
        catch(err)
        {
            console.log(err);
            return;
        }
    }

    return (
        <div className="side-btns-container">
            <span className="active-meter" style={{ top: `${(currentActive - 1) * 20}%` }}></span>
            <div className={`side-btn ${currentActive === 1 ? 'active' : ''}`} onClick={() => { scrollTo(0);}}>
                <FontAwesomeIcon icon={faHome} className="menu-btn-icon"/>  
                <h3>Home</h3>
            </div>
            <div className={`side-btn ${currentActive === 2 ? 'active' : ''}`} onClick={() => { scrollTo(1); }}>
                <FontAwesomeIcon icon={faTrophy} className="menu-btn-icon"/>
                <h3>Trending</h3>
            </div>
            <div className={`side-btn ${currentActive === 3 ? 'active' : ''}`} onClick={() => { scrollTo(2); }}>
                <FontAwesomeIcon icon={faChartColumn} className="menu-btn-icon"/> 
                <h3>Charts</h3>
            </div>
            <div className={`side-btn ${currentActive === 4 ? 'active' : ''}`} onClick={() => setCurrentActive(4)}>
                <FontAwesomeIcon icon={faWallet} className="menu-btn-icon"/>
                <h3>Wallet</h3>
            </div>
            <div className={`side-btn ${currentActive === 5 ? 'active' : ''}`} onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} className="menu-btn-icon"/>
                <h3>Logout</h3>
            </div>
        </div>
    );
}

export default Sidebtns;