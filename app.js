const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const ENV = process.env.NODE_ENV == 'production' ? 'production' : 'test';

// setup MongoDB
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

// connect DB
mongoose.connect(require('./env')['mongouri'])
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// Middleware initialization
app.use(bodyParser.json());

// Routes
app.use('/auth', require('./routes/auth'));

const port = ENV == 'production' ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Connection started at ${port}`);
});
