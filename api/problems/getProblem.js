const {invoker, writeResponse} = require('../../utils/util');
const { getProblem } = require('../../db/ProblemOps');

module.exports =  async(req, res) => {
  const problemid = req.params.id;
  const [problem, err] = await invoker(getProblem(problemid));
  if(err) return writeResponse({msg: err}, null, res);
  writeResponse(null, {problem: problem}, res);
};
