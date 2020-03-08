const User = require('../models/User')
const { invoker } = require('../utils/util');

const getUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({username: username})
      .then((user) => {
        if(!user) return reject('userNotFound');
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      })
  })
}

const createUser = (user) => {
  return new Promise( (resolve, reject) => {
    user.save()
      .then((user) => {
        return resolve(user)
      })
      .catch((err) => {
        return reject(err)
      })
  });
}

module.exports = {
  createUser,
  getUser
}