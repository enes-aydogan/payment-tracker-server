require('dotenv').config({path: './config/.env'});
const express = require('express');

const app = express()

app.get('/', (req, res) => {
    res.send('Enes Aydoğan arkadaşım 2');
})

app.listen(3000, () => {
    console.log('BAŞARILI!');
})