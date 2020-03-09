const { assert } = require('chai');
const { getUser } = require('../db/UserOps');
const { invoker } = require('../utils/util');
const { connect_db } = require('../db/connect');
const mongoose = require('mongoose');


describe('Test for user', async function() {
  before((done) => { 
    connect_db()
      .then(() => done())
      .catch((err) => done(err))
  })
  
  it('db user success tests', async () => {
    let [user, err] = await invoker(getUser('test'));
    assert.equal(err, null);
    assert.equal(user.name, "Abhishekk Yadav");
    assert.notEqual(user.password, "test");
  })

  it('db user user not exists tests', async () => {
    let [user, err] = await invoker(getUser('___'));
    assert.equal(err, "userNotFound");
  })

  after((done) => {
    mongoose.connection.close()
      .then(() => done())
      .catch((err) => done(err))
  })
});
