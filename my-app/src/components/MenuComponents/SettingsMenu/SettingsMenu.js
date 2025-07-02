import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import './SettingsMenu.css';
import { faPen, faX, faLock, faFloppyDisk, faPowerOff, faTrash } from "@fortawesome/free-solid-svg-icons";
import LineHeader from '../../StyleComponents/LineHeader/LineHeader';
import translate from "../../../Translator/Translator";

const SettingsMenu = ({isSettingsMenuDisplayed, setIsSettingsMenuDisplayed, setIsModifyProfileMenuDisplayed, 
    setIsMenuHubDisplayed, email, token, username, id, setIsPopUpDisplayed, setText, colorMode, languageVersion, setColorMode, setLanguageVersion}) => {

    const imageUrl = `${process.env.REACT_APP_API_URL}/getProfilePicture?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    const scrollRef = useRef(null);
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    const [choosenLang, setChoosenLang] = useState(languageVersion);
    const [choosenMode, setChoosenMode] = useState(colorMode);

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
                setText(languageVersion === 'PL' ? "Wysłano email z linkiem do resetu hasła" : 'Email with password reset has been sent');

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

    const handleSave = () => {
        setColorMode(choosenMode);
        setLanguageVersion(choosenLang);

        localStorage.setItem('colorMode', choosenMode);
        localStorage.setItem('languageVersion', choosenLang);
        setIsSettingsMenuDisplayed(false); 
        setIsMenuHubDisplayed(false);
    }

    return (
        <div className={`settings-menu-container ${isSettingsMenuDisplayed ? '' : 'hidden'} ${colorMode}`} ref={scrollRef}>
            <div className="quit-btn" onClick={() => {setIsSettingsMenuDisplayed(false); setIsMenuHubDisplayed(false); } }>
                <FontAwesomeIcon icon={faX} className="x-icon"/>
            </div>

            <div className="picture-container">
                <div className="profile-picture" style={{backgroundImage: `url(${imageUrl})`}} />
            </div>

            <div className="data-container">

                <LineHeader text={`${translate(languageVersion, 'Dane profilowe')}`} colorMode={colorMode}/>
                
                <div className="data-container-text">
                    <h2>{username}</h2>
                    <h2 className="email">{email}</h2>
                    <h1 onClick={() => {scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' }); setIsModifyProfileMenuDisplayed(true); setIsSettingsMenuDisplayed(false); }}>{translate(languageVersion, 'Modyfikuj profil')} <FontAwesomeIcon icon={faPen} className="lock-icon" /> </h1>
                </div>
            </div>

            <div className="data-container">
                <LineHeader text={`${translate(languageVersion, 'Bezpieczeństwo')}`} colorMode={colorMode}/>
                <div className="data-container-text">
                    <h2>{translate(languageVersion, 'Twoje hasło jest zabezpieczone')}</h2>
                    <h2 className="email">{translate(languageVersion, 'Na zawsze')}..</h2>
                    <h1 onClick={changePassword}>{translate(languageVersion, 'Zmień hasło')} <FontAwesomeIcon icon={faLock} className="lock-icon" /> </h1>
                </div>
                
            </div>

            <div className="data-container">
                <LineHeader text={`${translate(languageVersion, 'Ustawienia aplikacji')}`} colorMode={colorMode}/>
                <div className="data-container-text">
                    <h2>{translate(languageVersion, 'Język')}: 
                        <select value={choosenLang} onChange={(e) => setChoosenLang(e.target.value)}>
                            {
                                languageVersion === 'PL' ? 
                                <>
                                    <option value={'PL'}>Polski</option>
                                    <option value={'EN'}>Angielski</option>
                                </> : <>
                                    <option value={'EN'}>English</option>
                                    <option value={'PL'}>Polish</option>
                                </>
                            }
                        </select>
                    </h2>
                    <h2>{translate(languageVersion, 'Tryb koloru')}: 
                        <select value={choosenMode} onChange={(e) => setChoosenMode(e.target.value)}>
                            {
                                colorMode === 'dark' ? 
                                <>
                                    <option value={'dark'}>{translate(languageVersion, 'Ciemny')}</option>
                                    <option value={'light'}>{translate(languageVersion, 'Jasny')}</option>
                                </> : <>
                                    <option value={'light'}>{translate(languageVersion, 'Jasny')}</option>
                                    <option value={'dark'}>{translate(languageVersion, 'Ciemny')}</option>
                                </>
                            }
                        </select>
                    </h2>
                    <h1 onClick={handleSave}>{translate(languageVersion, 'Zapisz')} <FontAwesomeIcon icon={faFloppyDisk} className="lock-icon" /> </h1>
                </div>
                
            </div>

            <div className="data-container">
                <LineHeader text={`${translate(languageVersion, 'Akcje')}`} colorMode={colorMode}/>
                <div className="data-container-text">
                    <h2>{translate(languageVersion, 'Konto')}: {isActive ? <span className="active">{translate(languageVersion, 'aktywne')}</span> : <span className="disabled">{translate(languageVersion, 'wyłączone')}</span>}</h2>
                    <div className="btns">
                        <h1 onClick={() => setIsActive(!isActive)}>{translate(languageVersion, 'Wyłącz konto')} <FontAwesomeIcon icon={faPowerOff} className="lock-icon" /> </h1>
                        <h1 className="delete" onClick={deleteAcc}>{translate(languageVersion, 'Usuń konto')} <FontAwesomeIcon icon={faTrash} className="lock-icon" /> </h1>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default SettingsMenu;