require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./services/database');

knex.test();

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT);

console.log('Bus service listening on PORT ' + process.env.PORT + '.');