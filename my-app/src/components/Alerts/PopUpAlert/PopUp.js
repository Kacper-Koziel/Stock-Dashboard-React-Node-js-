import React from "react";
import './PopUp.css';

const PopUp = ({ text, isDisplayed, setIsDisplayed }) => {

    const handleClose = () => {
        setIsDisplayed(false);
    };

    return (
        <div className={`PopUp-container ${isDisplayed ? '' : 'hidden'}`}>
            <div className="PopUp-content">
                <p>{text}</p>
                <button onClick={handleClose} className="PopUp-close-btn">
                    Zamknij
                </button>
            </div>
        </div>
    );
}

export default PopUp;
