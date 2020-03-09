const mongoose = require('mongoose');
const { mongouri } = require('../config/dotenv');

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

exports.connect_db = () => {
  return new Promise(async(resolve, reject) => {
    // connect DB
    try {
      await mongoose.connect(mongouri)
      console.log("Connected to DB");
      resolve(true);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};