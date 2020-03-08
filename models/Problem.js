const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  statement : {
    type: String,
    required: true
  },
  input_format: {
    type: String,
    required: true
  },
  output_format: {
    type: String,
    required: true
  },
  constraints: {
    type: String,
    required: true
  },
  sample_cases: {
    type: [Object],
    default: []
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.Model('Problem', ProblemSchema);