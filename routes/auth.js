const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserOps = require('../db/UserOps');
const {invoker, writeResponse} = require('../utils/util');
const num_iterations = require('../utils/util').num_iterations_for_bcrypt;

const validateJSON = (req, res, next) => {
  if(req.body.username && req.body.password) {
    next();
  } else {
    writeResponse({msg: 'invalidInputError'}, null, res);
  }
};

router.post('/create', validateJSON, async(req, res) => {
  const { username, password, name } = req.body;
  const [_, e] = await invoker(UserOps.getUser(username));
  if(e == null) return writeResponse({msg: 'userExists'}, null, res);
  const [hash, err] = await invoker(bcrypt.hash(password, num_iterations));
  if(err) return writeResponse(err, null, res);
  const [user, uerr] = await invoker(UserOps.createUser(
    new User({
      username: username,
      name: name,
      password: hash
    })
  ));
  if(uerr) return writeResponse({msg: uerr}, null, res);
  writeResponse(null, {user: user}, res);
});

router.post('/auth', validateJSON, async(req, res) => {
  const { username, password } = req.body;
  let [user, e] = await invoker(UserOps.getUser(username));
  if(e != null)  return writeResponse({msg: e}, null, res);
  const [match, err] = await invoker(bcrypt.compare(password, user.password));  
  if(err) return writeResponse({msg: err}, null, res);
  if(!match) return writeResponse({msg: 'invalidPassword'}, null, res);
  writeResponse(null, {user: user}, res);
});

module.exports = router;