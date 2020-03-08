const router = require('express').Router();
const saveProblem = require('./saveProblem');
const getBatch = require('./getBatch');
const getProblem = require('./getProblem');

router.get('/getProblem/:id', getProblem);
router.get('/getProblems/:num', getBatch);
router.post('/saveProblem', saveProblem);

module.exports = router;
