import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import './LoginOperations.css'

const LoginOperations = ({setIsLogged, colorMode, languageVersion}) => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState(1);
    
    const checkIsLogged = () => {
        const token = localStorage.getItem('token');

        if(!token)
        {
            return;
        }

        tryToUser(token);
    }

    const tryToUser = async (token) => {
        try
        {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/isLogged`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            const data = await response.json();
            const isActive = data.isActive;
            console.log(isActive)

            if(isActive)
            {
                navigate(`/logged?token=${token}`);
                return;
            }
            
        }
        catch(err)
        {
            console.log(err);
            return;
        }
    }

    useEffect(() => {
        checkIsLogged();
    }, []);
  
    return (
        <div className="operations-cards">

            <div className={`${formState === 1 ? 'shown' : 'hidden'} card`}>
                <LoginForm formState={formState} setFormState={setFormState} setIsLogged={setIsLogged} colorMode={colorMode} languageVersion={languageVersion}/>
            </div>

            <div className={`${formState === 2 ? 'shown' : 'hidden'} card`}>
                <RegisterForm formState={formState} setFormState={setFormState} colorMode={colorMode} languageVersion={languageVersion}/>
            </div>

            <div className={`${formState === 3 ? 'shown' : 'hidden'} card`}>
                <ForgotPasswordForm formState={formState} setFormState={setFormState} colorMode={colorMode} languageVersion={languageVersion}/>
            </div>
            
        </div>
    );
}

export default LoginOperations;