import React, { useEffect } from "react";
import './PopUp.css';
import translate from "../../../Translator/Translator";

const PopUp = ({ text, isPopUpDisplayed, setIsPopUpDisplayed, colorMode, languageVersion }) => {

    const handleClose = () => {
        setIsPopUpDisplayed(false);
    };

    return (
        <div className={`PopUp-container ${isPopUpDisplayed ? '' : 'hidden'}`}>
            <div className={`PopUp-content ${colorMode}`}>
                <p>{translate(languageVersion, text)}</p>
                <button onClick={handleClose} className="PopUp-close-btn">
                    {translate(languageVersion, 'Zamknij')}
                </button>
            </div>
        </div>
    );
}

export default PopUp;
