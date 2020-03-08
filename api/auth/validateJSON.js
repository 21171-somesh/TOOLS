const {invoker, writeResponse} = require('../../utils/util');

module.exports = (req, res, next) => {
  if(req.body.username && req.body.password) {
    next();
  } else {
    writeResponse({msg: 'invalidInputError'}, null, res);
  }
};
