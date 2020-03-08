const { assert } = require('chai');
const { getProblem, getProblems } = require('../db/ProblemOps');
const { invoker } = require('../utils/util');
const { connect_db } = require('../db/connect');
const mongoose = require('mongoose');


describe('Test for Problems', async function() {
  before((done) => { 
    connect_db()
      .then(() => done())
      .catch((err) => done(err))
  })
  
  it('db problem success tests', async () => {
    let [problem, err] = await invoker(getProblem('TEST'));
    assert.equal(err, null);
    assert.equal(problem.name, "Test Problem");
  })

  it('db problem failure tests', async () => {
    let [problem, err] = await invoker(getProblem('NOPROBLEM'));
    assert.notEqual(err, null);
  })
  
  it('db batch problems success tests', async () => {
    let [problems, err] = await invoker(getProblems(10));
    assert.equal(err, null);
    assert.isArray(problems);
  })

  after((done) => {
    mongoose.connection.close()
      .then(() => done())
      .catch((err) => done(err))
  })
});

