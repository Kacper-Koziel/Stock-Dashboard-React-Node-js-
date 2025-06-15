require('dotenv').config();
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
const logoutRouter = require('./Routes/DataModifiers/Logout/Logout');

const coinlistFetchingRouter = require('./Routes/DataFetchingRoutes/FetchCoinList/FetchCoinList');
const topListRouter = require('./Routes/DataFetchingRoutes/FetchTopList/FetchTopList');
const chartDataRouter = require('./Routes/DataFetchingRoutes/FetchChartData/FetchChartData');

app.use(cors({
    origin: [
        `http://localhost:${process.env.FRONTEND_PORT}`,
        `http://${process.env.PC_IP}:${process.env.FRONTEND_PORT}`
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

console.log(`http://${process.env.PC_IP}:${process.env.FRONTEND_PORT}`);

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/forgotPassword', forgotPasswordRouter);
app.use('/resetPassword', resetPasswordRouter);
app.use('/isLogged', isLoggedRouter);
app.use('/getUsername', getUsernameRouter);
app.use('/getProfilePicture', profilePictureRouter);
app.use('/updateUserData', updateUserDataRouter);
app.use('/coinlist', coinlistFetchingRouter);
app.use('/toplist', topListRouter);
app.use('/chartData', chartDataRouter);
app.use('/logout', logoutRouter);

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
});
  