import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

const LoginForm = ({ formState, setFormState, setIsLogged }) => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email.trim());
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
        return regex.test(password.trim());
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9._\- ]{4,20}$/;
        return regex.test(username.trim());
    };

    const validateData = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!validateEmail(data.email)) {
            newErrors.email = 'Incorrect email';
        }

        if (!validatePassword(data.password)) {
            newErrors.password = 'Incorrect password';
        }

        if (!validateUsername(data.username)) {
            newErrors.username = 'Incorrect username';
        }

        setErrors(newErrors);


        if (Object.keys(newErrors).length === 0) {
            handleLogin();
        }
    };

    const clearForm = () => {

        if (Object.values(data).some(val => val.trim() !== '')) {
            setData({
                email: '',
                username: '',
                password: ''
            });
        }

        if(Object.keys(errors).length > 0)
        {
            setErrors({});
        }
    }

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.1.19:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if(response.status === 404)
            {
                setErrors({ email: result.error });
                return;
            }

            if(response.status === 401)
            {
                setErrors({ email: result.error });
                return;
            }

            if(response.status === 200)
            {
                setIsLogged(true);
                const token = result.token;
                localStorage.setItem('token', token);
                navigate(`/logged?token=${token}`);
                return;
            }
        } 
        catch (err) {
            console.error("Login error:", err);
            return;
        }

    }

    return (
        <div className="login-container">
            <div className={`data ${formState === 1 ? 'shown' : 'hidden'}`}>
                <h1>Zaloguj się </h1>
                <form className="form-content" onSubmit={validateData}>
                    <div className="input-group">
                        <div className="input-field">
                            <h3>Nazwa użytkownika</h3>
                            <input type="text" id="login-username" name="username" placeholder="username" onChange={handleChange} />
                            {errors.username && <span className="error-text">*{errors.username}</span>}
                        </div>

                        <div className="input-field">
                            <h3>Email</h3>
                            <input type="email" id="login-email" name="email" placeholder="email" onChange={handleChange} />
                            {errors.email && <span className="error-text">*{errors.email}</span>}
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-field">
                            <h3>Hasło</h3>
                            <input type="password" id="login-password" name="password" placeholder="password" onChange={handleChange} />
                            {errors.password && <span className="error-text">*{errors.password}</span>}
                        </div>

                        <input type="submit" value="Zaloguj się" />
                        <div className="login-options">
                            <h5 onClick={() => {setFormState(2); clearForm()}}>Zarejestruj się</h5>
                            <h5 onClick={() => {setFormState(3); clearForm()}}>Odzyskaj hasło</h5>
                        </div>
                    </div>
                
                </form>
            </div>
        </div>
    );
}   

export default LoginForm;