const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Create server express
const app = express();

//connection db
dbConnection();

//cors
app.use(cors());

//Public root
app.use(express.static('public'));

//Write and read body
app.use(express.json());

//Router
app.use('/api/auth', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log(`Server running port ${ process.env.PORT }`);
})