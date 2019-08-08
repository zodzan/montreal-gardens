require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const gardenRouter = require('./routes/garden.routes');
const busRouter = require('./routes/bus.routes');

const app = express();

app.use(bodyParser.json());

app.use('/', gardenRouter);
app.use('/', busRouter);

app.listen(process.env.PORT);