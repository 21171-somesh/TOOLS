const express = require('express');
const bodyParser = require('body-parser');
const { connect_db } = require('./db/connect')
const{ NODE_ENV } = require('./config/dotenv');

const app = express();
const ENV = process.env.NODE_ENV == 'production' ? 'production' : 'test';

connect_db()
  .then()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })

// Middleware initialization
app.use(bodyParser.json());

// Handle Endpoints 
app.use('/api', require('./api/router'));

const port = ENV == 'production' ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Connection started at ${port}`);
});
