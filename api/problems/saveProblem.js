const { invoker, writeResponse } = require('../../utils/util');
const Problem = require('../../models/Problem');
const { getProblem, saveProblem } = require('../../db/ProblemOps');

module.exports = async(req, res) => {
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
};
