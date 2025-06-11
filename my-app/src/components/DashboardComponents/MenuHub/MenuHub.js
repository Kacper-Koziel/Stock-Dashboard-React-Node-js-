import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SettingsMenu from '../../MenuComponents/SettingsMenu/SettingsMenu';
import ModifyProfileMenu from "../../MenuComponents/ModifyProfileMenu/ModifyProfileMenu";

import './MenuHub.css'

const MenuHub = ({isMenuHubDisplayed, setIsMenuHubDisplayed, isSettingsMenuDisplayed, setIsSettingsMenuDisplayed}) => {

    const [isModifyProfileMenuDisplayed, setIsModifyProfileMenuDisplayed] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

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
                setID(data.id);
            }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserData();
    }, [token]);


    return (
        <div className={`menu-hub ${isMenuHubDisplayed ? '' : 'hidden'}`}>
            <SettingsMenu isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed} setIsModifyProfileMenuDisplayed={setIsModifyProfileMenuDisplayed} setIsMenuHubDisplayed={setIsMenuHubDisplayed} email={email} token={token} username={username} id={id}/>
            <ModifyProfileMenu isModifyProfileMenuDisplayed={isModifyProfileMenuDisplayed} setIsModifyProfileMenuDisplayed={setIsModifyProfileMenuDisplayed} setIsSettingMenuDisplayed={setIsSettingsMenuDisplayed} email={email} token={token} username={username} id={id} />
        </div>
    )
}

export default MenuHub;