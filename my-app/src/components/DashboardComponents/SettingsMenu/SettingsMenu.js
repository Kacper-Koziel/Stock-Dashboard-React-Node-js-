import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SettingsMenu.css';
import { faPen, faX, faLock, faCreditCard, faFloppyDisk, faPowerOff, faTrash } from "@fortawesome/free-solid-svg-icons";
import LineHeader from '../../StyleComponents/LineHeader/LineHeader';
import ModifyProfileMenu from "../ModifyProfileMenu/ModifyProfileMenu";

const SettingsMenu = ({isSettingsMenuDisplayed, setIsSettingsMenuDisplayed}) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const imageUrl = `http://192.168.1.19:5000/getProfilePicture?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    const scrollRef = useRef(null);

    const [isModifyProfileMenuDisplayed, setIsModifyProfileMenuDisplayed] = useState(false);

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
        <div className={`settings-menu-container ${isSettingsMenuDisplayed ? '' : 'hidden'}`} ref={scrollRef}>
            <div className="quit-btn" onClick={() => {setIsSettingsMenuDisplayed(false)} }>
                <FontAwesomeIcon icon={faX} className="x-icon"/>
            </div>

            <div className="picture-container">
                <div className="profile-picture" style={{backgroundImage: `url(${imageUrl})`}} />
            </div>

            <div className="data-container">

                <LineHeader text={'Profile info'} />
                
                <div className="data-container-text">
                    <h2>{username}</h2>
                    <h2 className="email">{email}</h2>
                    <h1 onClick={() => {scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' }); setIsModifyProfileMenuDisplayed(true)}}>Modify profile <FontAwesomeIcon icon={faPen} className="lock-icon" /> </h1>
                </div>
            </div>

            <div className="data-container">
                <LineHeader text={'Security'} />
                <div className="data-container-text">
                    <h2>Your password is encrypted</h2>
                    <h2 className="email">forever..</h2>
                    <h1>Change password <FontAwesomeIcon icon={faLock} className="lock-icon" /> </h1>
                </div>
                
            </div>

            <div className="data-container">
                <LineHeader text={'Purchases'} />
                <div className="data-container-text">
                    <h2>Your total spendings: 0$</h2>
                    <h1>Payment history <FontAwesomeIcon icon={faCreditCard} className="lock-icon" /> </h1>
                </div>
                
            </div>

            <div className="data-container">
                <LineHeader text={'App settings'} />
                <div className="data-container-text">
                    <h2>Language: English</h2>
                    <h2>Color mode: Default</h2>
                    <h1>Save <FontAwesomeIcon icon={faFloppyDisk} className="lock-icon" /> </h1>
                </div>
                
            </div>

            <div className="data-container">
                <LineHeader text={'Actions'} />
                <div className="data-container-text">
                    <h2>Account: <span className="active">Active</span></h2>
                    <div className="btns">
                        <h1>Disable account <FontAwesomeIcon icon={faPowerOff} className="lock-icon" /> </h1>
                        <h1 className="delete">Delete account <FontAwesomeIcon icon={faTrash} className="lock-icon" /> </h1>
                    </div>
                </div>
                
            </div>
            
            <ModifyProfileMenu isModifyProfileMenuDisplayed={isModifyProfileMenuDisplayed} setIsModifyProfileMenuDisplayed={setIsModifyProfileMenuDisplayed} />
        </div>
    );
}

export default SettingsMenu;