import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './SidebarProfile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const SidebarProfile = ({setIsMenuHubDisplayed, isSettingsMenuDisplayed, setIsSettingsMenuDisplayed}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const imageUrl = `http://192.168.1.19:5000/getProfilePicture?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
            const response = await fetch('http://192.168.1.19:5000/getUsername', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            const data = await response.json();

            if(response.status === 200) {
                setUsername(data.username);
                setEmail(data.email);
            }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <div className="sidebar-profile-container">


            <div className="img-container">
                <div className="img-frame" style={{ backgroundImage: `url(${imageUrl})` }}>

                </div>
            </div>

            <div className="text-container">
                <h1>{`Welcome ${username}`}</h1>
            </div>

            <div className="options-btn" onClick={() => {setIsMenuHubDisplayed(true); setIsSettingsMenuDisplayed(true)}}>
                <FontAwesomeIcon icon={faGear} className="settings-icon" /> 
            </div>
        </div>
    );
    
}

export default SidebarProfile;