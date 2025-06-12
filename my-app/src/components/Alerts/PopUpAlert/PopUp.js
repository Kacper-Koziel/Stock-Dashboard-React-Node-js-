import React from "react";
import './PopUp.css';

const PopUp = ({ text, isPopUpDisplayed, setIsPopUpDisplayed }) => {

    const handleClose = () => {
        setIsPopUpDisplayed(false);
    };

    return (
        <div className={`PopUp-container ${isPopUpDisplayed ? '' : 'hidden'}`}>
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
