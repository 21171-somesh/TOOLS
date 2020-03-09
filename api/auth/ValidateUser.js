const bcrypt = require('bcrypt');
const User = require('../../models/User');
const UserOps = require('../../db/UserOps');
const {invoker, writeResponse} = require('../../utils/util');

module.exports = async(req, res) => {
  const { username, password } = req.body;
  let [user, e] = await invoker(UserOps.getUser(username));
  if(e != null)  return writeResponse({msg: e}, null, res);
  const [match, err] = await invoker(bcrypt.compare(password, user.password));  
  if(err) return writeResponse({msg: err}, null, res);
  if(!match) return writeResponse({msg: 'invalidPassword'}, null, res);
  writeResponse(null, {user: user}, res);
};
