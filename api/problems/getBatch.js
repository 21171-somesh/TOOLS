const {invoker, writeResponse} = require('../../utils/util');
const { getProblems } = require('../../db/ProblemOps');


module.exports = async(req, res) => {
  const { num } = req.params.num;
  const [problems, err] = await invoker(getProblems(num));
  if(err) return writeResponse({msg: err}, null, res);
  writeResponse(null, {problems: problems}, res);
};
