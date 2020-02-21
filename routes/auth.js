const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

const num_iterations = 10;

const validateJSON = (req, res, next) => {
  if(req.body.username && req.body.password) {
    next();
  } else {
    res.json({
      error: true,
      message: 'invalidInputError'    
    });
  }
};

router.post('/create', validateJSON, (req, res) => {
  const body = req.body;
  const password = body.password;
  User.findOne({username: body.username}).then((user) => {
    if(user) return res.json({error: true, message: 'userExists'});
    bcrypt.hash(password, num_iterations, (err, hash) => {
      if(err) res.json({error: true, message: err});
      else {
        const newUser = new User({
          username: body.username,
          name: body.name,
          password: hash
        });
        newUser.save().then((nUser) => {
          res.json({
            error: false,
            message: 'success',
            User: nUser
          });
        }).catch((err) => {
          res.json({error: true, message: err});
        })
      }
    });
  });
});

router.post('/auth', validateJSON, (req, res) => {
  const body = req.body;
  const password = body.password;
  User.findOne({username: body.username})
    .then((user) => {
      if(!user) return res.json({error: true, message: 'userNotFound'});
      bcrypt.compare(password, user.password, (err, match) => {
        if(err) {
          res.json({error: true, message: err});
        } else {
          if(match) res.json({error: false, message: 'success', User: user});
          else res.json({eror: true, message: 'passwordMismatch'});
        }
      })
    })
    .catch(err => {
      res.json({error: true, message: err});
    });
});

module.exports = router;