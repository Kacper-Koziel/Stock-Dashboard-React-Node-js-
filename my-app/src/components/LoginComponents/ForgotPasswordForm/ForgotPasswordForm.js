import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import PopUp from "../../Alerts/PopUpAlert/PopUp";

import './ForgotPasswordForm.css'

const ForgotPasswordForm = ({ formState, setFormState, colorMode, languageVersion }) => {

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const [isPopUpDisplayed, setIsPopUpDisplayed] = useState(false);
    const [popUpText, setPopUpText] = useState("");

    const handleChanges = (e) => {
        setEmail(e.target.value);
    }

    const validateData = (e) => {
        e.preventDefault();
        setError(null)


        if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)))
        {
            setError("Incorrect email");
            return;
        }


        setIsPopUpDisplayed(true);
        setPopUpText("Wysłano email z linkiem do resetu hasła");

        handleSubmit();
    }

    const handleSubmit = async () => {
        try
        {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if(response.status !== 200)
            {
                setError(await response.json().error);
                return;
            }
        }
        catch(err)
        {
            console.log('Forgot password err: ', err);
        }
    }

    return (
        <div className={`forgot-password-container ${colorMode}`}>
            <div className={`data ${formState === 3 ? 'shown' : 'hidden'}`}>
                <h1> Odzyskaj hasło </h1>
                <form onSubmit={validateData}>

                    <div className="inputField">
                        <h3>Email</h3>
                        <input type="email" id="email" name="email" placeholder="email" onChange={handleChanges} value={email}/>
                        {error && <span className="err"> *{error} </span>}
                    </div>
    

                    <input type="submit" value="Odzyskaj hasło" />
                    <div className="forgot-password-options">
                        <h5 onClick={() => setFormState(1)}>Zaloguj się</h5>
                        <h5 onClick={() => setFormState(2)}>Zarejestruj się</h5>
                    </div>
                </form>
                <PopUp isPopUpDisplayed={isPopUpDisplayed} setIsPopUpDisplayed={setIsPopUpDisplayed} text={popUpText}/>
                
            </div>
        </div>
    )
}

export default ForgotPasswordForm;