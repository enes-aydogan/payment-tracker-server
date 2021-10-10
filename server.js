require('dotenv').config({path: './config/.env'});
const express = require('express');
const app = express();

const db = require('./utils/db');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const usrRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const paymentRouter = require('./routes/payment');
const periodRouter = require('./routes/period');

app.use("/api/v1/users", usrRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/period", periodRouter)

db.connect()
    .then((result) => {
        app.listen(port);
        console.log('connected');
    })
    .catch((err) => {
        console.log(err);
    })