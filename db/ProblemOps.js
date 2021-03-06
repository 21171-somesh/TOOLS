const Problem = require('../models/Problem');

const getProblem = (problem_id) => {
  return new Promise((resolve, reject) => {
    Problem.findOne({code: problem_id})
      .then((problem) => {
        if(!problem) return reject('problemNotFound');
        resolve(problem);
      })
      .catch((err) => {
        reject(err);
      })
  });
};

const getProblems = (num) => {
  return new Promise((resolve, reject) => {
    Problem.find()
      .sort({solved: -1})
      .select('code name solved attempted')
      .limit(num)
      .then((problems) => {
        resolve(problems);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

const saveProblem = (problem) => {
  return new Promise((resolve, reject) => {
    problem.save()
      .then((problem) => {
        resolve(problem);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

module.exports = {
  getProblem,
  getProblems,
  saveProblem
}