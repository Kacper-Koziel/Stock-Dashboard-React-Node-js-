import React, { useState } from "react";
import './reset.css';
import PopUp from '../components/Alerts/PopUpAlert/PopUp';
import { useLocation } from "react-router-dom";
import translate from "../Translator/Translator";

function ResetPassword({colorMode, languageVersion}) {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const [isDisplayed, setIsDisplayed] = useState(false);
    const [text, setText] = useState('');

    const [data, setData] = useState({
        password: '',
        passwordAgain: ''
    })
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }


    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
        return regex.test(password.trim());
    };

    const validateData = (e) => {

        e.preventDefault();

        setErrors({});

        const errs = {};
        
        if(!validatePassword(data.password))
        {
            errs.password = 'Incorrect password';
        }

        if(!validatePassword(data.passwordAgain))
        {
            errs.passwordAgain = 'Incorrect password';
        }

        if(data.password !== data.passwordAgain)
        {
            errs.password = 'Passwords does not match';
            errs.passwordAgain = 'Passwords does not match';
        }

        setErrors(errs);

        if(Object.keys(errors).length > 0)
        {
            return;
        }

        resetPasswordFromToken();
    }

    const resetPasswordFromToken = async () => {
        try
        {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/resetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token, password: data.password })
            });

            if(!(response.status === 200))
            {
                errors.password = await response.json().error;
                return;
            }

            setText(languageVersion === 'PL' ? 'Zmieniono hasło. Zaloguj się ponownie' : 'Password changed. Log in again');
            setIsDisplayed(true);

        }   
        catch(err)
        {
            console.log(err);
            return;
        }

        
    }
    

    return (
        <div className={`reset-container ${colorMode}`}>
            <div className={`data`}>
                <h1>{translate(languageVersion, 'Zmień hasło')} </h1>
                <form className="form-content" onSubmit={validateData}>
                    <div className="input-group">
                        <div className="input-field">
                            <h3>{translate(languageVersion, 'Hasło')}</h3>
                            <input type="password" id="reset-password" name="password" placeholder="password" onChange={handleChange}/>
                            {errors.password && <span className="error-text">*{errors.password}</span>}
                        </div>

                        <div className="input-field">
                            <h3>{translate(languageVersion, 'Powtórz hasło')}</h3>
                            <input type="password" id="reset-password-again" name="passwordAgain" placeholder="repeated password" onChange={handleChange} />
                            {errors.passwordAgain && <span className="error-text">*{errors.passwordAgain}</span>}
                        </div>

                        <input type="submit" value={`${translate(languageVersion, 'Zmień hasło')}`} />
                    </div>
                </form>

                <PopUp isDisplayed={isDisplayed} setIsDisplayed={setIsDisplayed} text={text} />
            </div>
        </div>
    );
}

export default ResetPassword;