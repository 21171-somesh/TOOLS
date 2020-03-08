const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

exports.connect_db = async() => {
  // connect DB
  try {
    if(!process.env.mongouri) process.exit(1);
    await mongoose.connect(process.env.mongouri);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
