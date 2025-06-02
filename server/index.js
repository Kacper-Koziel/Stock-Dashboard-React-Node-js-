const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const loginRouter = require('./Login/login');
const registerRouter = require('./Register/register');
const forgotPasswordRouter = require('./ForgotPassword/forgotpassword');
const resetPasswordRouter = require('./resetPassword/resetpassword');
const isLoggedRouter = require('./IsLogged/isLogged');
const getUsernameRouter = require('./GetUsername/getUsername');
const profilePictureRouter = require('./GetProfilePicture/getProfilePicture');

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

app.listen(5000, '0.0.0.0', () => {
    console.log('Server is running on http://0.0.0.0:5000');
});
  