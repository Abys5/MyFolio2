const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();

const PORT = process.env.LISTEN_PORT || 3000;

const db = require('./database');

const app = express();

const uidgenerator = require('uid-generator');
const uidgen = new uidgenerator(512, uidgenerator.BASE58);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log('[*] Express listening on Port: ' + PORT);
});
