import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import './SettingsMenu.css';
import { faPen, faX, faLock, faFloppyDisk, faPowerOff, faTrash } from "@fortawesome/free-solid-svg-icons";
import LineHeader from '../../StyleComponents/LineHeader/LineHeader';

const SettingsMenu = ({isSettingsMenuDisplayed, setIsSettingsMenuDisplayed, setIsModifyProfileMenuDisplayed, 
    setIsMenuHubDisplayed, email, token, username, id, setIsPopUpDisplayed, setText}) => {

    const imageUrl = `${process.env.REACT_APP_API_URL}/getProfilePicture?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    const scrollRef = useRef(null);
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();


    const changePassword = async () => {
        setText("Poczekaj chwilę");
        setIsPopUpDisplayed(true);
        try
        {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if(response.status === 200)
            {
                setText("Na mail wysłano link do resetu hasła");
            }
            else
            {
                setText(await response.json().error);
            }

            setIsPopUpDisplayed(true);
        }
        catch(err)
        {
            console.log('Forgot password err: ', err);
        }
    }

    const deleteAcc = async () => {
        try
        {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/deleteAccount`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if(response.status !== 200)
            {
                console.log(await response.json());
                return
            }

            const logoutRes = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            }) 

            if(logoutRes.status === 200)
            {
                navigate('../');
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return (
        <div className={`settings-menu-container ${isSettingsMenuDisplayed ? '' : 'hidden'}`} ref={scrollRef}>
            <div className="quit-btn" onClick={() => {setIsSettingsMenuDisplayed(false); setIsMenuHubDisplayed(false); } }>
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
                    <h1 onClick={() => {scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' }); setIsModifyProfileMenuDisplayed(true); setIsSettingsMenuDisplayed(false); }}>Modify profile <FontAwesomeIcon icon={faPen} className="lock-icon" /> </h1>
                </div>
            </div>

            <div className="data-container">
                <LineHeader text={'Security'} />
                <div className="data-container-text">
                    <h2>Your password is encrypted</h2>
                    <h2 className="email">forever..</h2>
                    <h1 onClick={changePassword}>Change password <FontAwesomeIcon icon={faLock} className="lock-icon" /> </h1>
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
                    <h2>Account: {isActive ? <span className="active">Active</span> : <span className="disabled">Disabled</span>}</h2>
                    <div className="btns">
                        <h1 onClick={() => setIsActive(!isActive)}>Disable account <FontAwesomeIcon icon={faPowerOff} className="lock-icon" /> </h1>
                        <h1 className="delete" onClick={deleteAcc}>Delete account <FontAwesomeIcon icon={faTrash} className="lock-icon" /> </h1>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default SettingsMenu;