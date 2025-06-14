import React, { useState } from "react";
import './RegisterForm.css';


const RegisterForm = ({formState,setFormState}) => {
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
            newErrors.password = 'Password has to contain from 8  to 20characters (at least one big letter, one small letter and one digit)';
        }

        if (!validateUsername(data.username)) {
            newErrors.username = 'Username has to contain from 4 to 20 characters';
        }

        setErrors(newErrors);


        if (Object.keys(newErrors).length === 0) {
            handleSubmit(errors);
        }
    };


    const handleSubmit = async (errors) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if(response.status === 409)
            {
                errors.email = result.error;
            }

            if(response.status === 400)
            {
                errors.username =  result.error;
                errors.password = result.error;
                errors.email = result.error;
            }

            if(response.status !== 201)
            {
                setErrors(errors);
                return;
            }

            clearForm();
            setFormState(1);
        } 
        catch (err) {
            console.log("Error while uploading data: ", err)
        }
    };

    const clearForm = () => {
        setData({
            email: '',
            username: '',
            password: ''
        });

        setErrors({})
    }

    return (
        
        <div className="register-container">

            <div className={`data ${formState === 2 ? 'shown' : 'hidden'}`}>

                <h1>Zarejestruj się</h1>
                <form onSubmit={validateData} className="form-content">

                    <div className="input-group">
                        <div className="input-field">
                            <h3>Nazwa użytkownika </h3>
                            <input type="text" id="register-username" value={data.username} name="username" onChange={handleChange} placeholder="username"/>
                            {errors.username && <span className="error-text">*{errors.username}</span>}
                        </div>

                        <div className="input-field">
                            <h3>Email</h3>
                            <input type="email" id="register-email" value={data.email} name="email" onChange={handleChange} placeholder="email" />
                            {errors.email && <span className="error-text">*{errors.email}</span>}
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-field">
                            <h3>Hasło</h3>
                            <input type="password" id="register-password" value={data.password} name="password" onChange={handleChange} placeholder="password"/>
                            {errors.password && <span className="error-text">*{errors.password}</span>}
                        </div>

                        <input type="submit" value="Zarejestruj się" />
                        <div className="register-options">
                            <h5 onClick={() => {setFormState(1); clearForm()}}>Zaloguj się</h5>
                            <h5 onClick={() => {setFormState(3); clearForm()}}>Odzyskaj hasło</h5>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}   

export default RegisterForm;