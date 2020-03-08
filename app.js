const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/connect')

const app = express();
const ENV = process.env.NODE_ENV == 'production' ? 'production' : 'test';

db.connect_db();

// Middleware initialization
app.use(bodyParser.json());

// Handle Endpoints 
app.use('/api', require('./api/router'));

const port = ENV == 'production' ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Connection started at ${port}`);
});
