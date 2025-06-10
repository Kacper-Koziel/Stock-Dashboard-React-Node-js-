const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const loginRouter = require('./Routes/LoginSystemRoutes/Login/login');
const registerRouter = require('./Routes/LoginSystemRoutes/Register/register');
const forgotPasswordRouter = require('./Routes/LoginSystemRoutes/ForgotPassword/forgotpassword');
const resetPasswordRouter = require('./Routes/LoginSystemRoutes/resetPassword/resetpassword');

const isLoggedRouter = require('./Routes/DataFetchingRoutes/IsLogged/isLogged');
const getUsernameRouter = require('./Routes/DataFetchingRoutes/GetUsername/getUsername');
const profilePictureRouter = require('./Routes/DataFetchingRoutes/GetProfilePicture/getProfilePicture');

const updateUserDataRouter = require('./Routes/DataModifiers/UpdateUserData/updateUserData');

app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.1.19:3000'],
    methods: ['GET', 'POST'],
}));

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/forgotPassword', forgotPasswordRouter);
app.use('/resetPassword', resetPasswordRouter);
app.use('/isLogged', isLoggedRouter);
app.use('/getUsername', getUsernameRouter);
app.use('/getProfilePicture', profilePictureRouter);
app.use('/updateUserData', updateUserDataRouter);

app.listen(5000, '0.0.0.0', () => {
    console.log('Server is running on http://0.0.0.0:5000');
});
  