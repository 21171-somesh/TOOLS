const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db')

const app = express();
const ENV = process.env.NODE_ENV == 'production' ? 'production' : 'test';

db.connect_db();

// Middleware initialization
app.use(bodyParser.json());

// Routes
app.use('/auth', require('./routes/auth'));

const port = ENV == 'production' ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Connection started at ${port}`);
});
