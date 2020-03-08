const router = require('express').Router();
const vaildateJSON = require('./validateJSON');
const CreateUser = require('./CreateUser');
const ValidateUser = require('./ValidateUser');

router.use(vaildateJSON);
router.post('/create', CreateUser);
router.post('/auth', ValidateUser);

module.exports = router;