const mongoose = require('mongoose');

const ProblemSchema = mongoose.Schema({
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
  tags: {
    type: [String],
    defaule: ["Problem"]
  },
  created: {
    type: Date,
    default: Date.now()
  },
  solved: {
    type: Number,
    default: 0
  },
  attempted: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Problem', ProblemSchema);