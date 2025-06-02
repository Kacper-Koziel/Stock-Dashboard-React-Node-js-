import React from "react";
import './ModifyProfileMenu.css'

const ModifyProfileMenu = ({isModifyProfileMenuDisplayed, setIsModifyProfileMenuDisplayed}) => {
    return (
        <div className={`modify-profile-menu ${isModifyProfileMenuDisplayed ? '' : 'hidden'}`}>
            <h1>Hi</h1>
        </div>
    );
}

export default ModifyProfileMenu;