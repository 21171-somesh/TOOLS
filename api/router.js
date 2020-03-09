const router = require('express').Router();

router.use('/auth', require('./auth/router'));
router.use('/problems', require('./problems/router'));

module.exports = router;