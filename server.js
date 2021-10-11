require('dotenv').config({path: './config/.env'});
const express = require('express');
const cors = require('cors')
const app = express();

const db = require('./utils/db');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())


const usrRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const paymentRouter = require('./routes/payment');
const periodRouter = require('./routes/period');
const orgRouter = require('./routes/organization');

app.use("/api/v1/users", usrRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/period", periodRouter)
app.use("/api/v1/organization", orgRouter)


db.connect()
    .then((result) => {
        app.listen(port);
        console.log('connected');
    })
    .catch((err) => {
        console.log(err);
    })