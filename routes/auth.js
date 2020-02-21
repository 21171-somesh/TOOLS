const router = require('express').Router();
const bcrypt = require('bcrypt');
const num_iterations = 5;

router.post('/', (req, res) => {
  const body = req.body;
  const password = body.password;
  if(body.mode == 'create') {
    bcrypt.hash(password, num_iterations, (err, hash) => {
      if(err) console.log(err);
      else {
        console.log(hash);
        res.json({
          hash: hash
        })
      }
    });
  } else {
    bcrypt.compare(password, hash, (err, ress) => {
      if(err) console.log(err);
      else {
        console.log(ress);
        res.json({res: ress})
      }
    })
  }
 })

module.exports = router;