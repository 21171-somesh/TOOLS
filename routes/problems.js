const router = require('express').Router();
const Problem = require('../models/Problem');
const {invoker, writeResponse} = require('../utils/util');
const {getProblem, getProblems, saveProblem} = require('../db/ProblemOps');

router.get('/getProblem/:id', async(req, res) => {
  const problemid = req.params.id;
  const [problem, err] = await invoker(getProblem(problemid));
  if(err) return writeResponse({msg: err}, null, res);
  writeResponse(null, {problem: problem}, res);
});

router.get('/getProblems/:num', async(req, res) => {
  const { num } = req.params.num;
  const [problems, err] = await invoker(getProblems(num));
  if(err) return writeResponse({msg: err}, null, res);
  writeResponse(null, {problems: problems}, res);
})

router.post('/saveProblem', async(req, res) => {
  const { code } = req.body;
  const [_, exists] = await invoker(getProblem(code));
  if(!exists || exists != 'problemNotFound') {
    if(exists) return writeResponse({msg: err}, null, res);
    return writeResponse({msg: 'duplicateCode'}, null, res); 
  }
  const { statement, name, input_format } = req.body;
  const { output_format, constraints, sample_cases } = req.body;
  const [problem, err] = await invoker(saveProblem(
    new Problem({
      code: code,
      statement: statement,
      name: name,
      input_format: input_format,
      output_format: output_format,
      constraints: constraints,
      sample_cases: sample_cases
    })
  ));
  if(err) return writeResponse({msg: err}, null, res);
  writeResponse(null, {problem: problem}, res);
});

module.exports = router;