import React, { use } from "react";
import { useState } from "react";
import './ModifyProfileMenu.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder, faX } from "@fortawesome/free-solid-svg-icons";
import LineHeader from "../../StyleComponents/LineHeader/LineHeader";

const ModifyProfileMenu = ({isModifyProfileMenuDisplayed, setIsModifyProfileMenuDisplayed, setIsSettingMenuDisplayed, email, token, username, id}) => {
    const imageUrl = `http://192.168.1.19:5000/getProfilePicture?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

    const [data, setData] = useState({
        username: '',
        email: '',
        pic: '',
        filename: ''
    });

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
            setData(prev => ({...prev, filename: e.target.value}))
        } 
        else {
            setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9._\- ]{4,20}$/;
        return regex.test(username.trim());
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email.trim());
    };

    const handleSubmit = async () => {

        if(!validateEmail(data.email))
        {
            data.email = email;
        }

        if(!validateUsername(data.username))
        {
            data.username = username;
        }

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('username', data.username);
        formData.append('image', data.pic);
        formData.append('id', id);

        try
        {
            const response = await fetch('http://192.168.1.19:5000/updateUserData', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if(response.status !== 200)
            {
                console.log(result.error);
                return;
            }

            window.location.reload();
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return (
        <div className={`modify-profile-menu ${isModifyProfileMenuDisplayed ? '' : 'hidden'}`}>
            <div className="quit-btn" onClick={() => {setIsModifyProfileMenuDisplayed(false); setIsSettingMenuDisplayed(true); } }>
                <FontAwesomeIcon icon={faX} className="x-icon"/>
            </div>

            <h2 className="header">Modify user data</h2>

            <div className="picture-container">
                <div className="profile-picture" style={{backgroundImage: `url(${imageUrl})`}} />
            </div>

            <LineHeader text={"Modify light data"} />
            
            <div className="modify-light-data">
                <form>
                    <div className="input-field">
                        <h3>Nazwa użytkownika</h3>
                        <input type="text" id="modify-username" name="username" placeholder={username} onChange={handleChange} />
                    </div>

                    <div className="input-field">
                        <h3>Email</h3>
                        <input type="email" id="modify-email" name="email" placeholder={email} onChange={handleChange} />
                    </div>
                </form>
            </div>

            <LineHeader text={"Upload new profile image"} />

            <div className="upload-profile-pic">
                <div className="input-field">
                    <label htmlFor="pic">Upload profile picture <FontAwesomeIcon icon={faFolder} className="upload-icon" /></label>
                    <input type="file" id="pic" name="pic" onChange={handleChange}/> 
                    <h1>{data.filename.trim() === '' ? 'No file selected' : data.filename.split(/(\\|\/)/g).pop()}</h1>
                </div>
            </div>

            <div className="apply-container"> 
                <h4 onClick={handleSubmit}>Apply</h4>
            </div>
        </div>
    );
}

export default ModifyProfileMenu;