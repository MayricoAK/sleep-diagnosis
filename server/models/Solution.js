const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    diagnosis: {type: String},
    solution: {type: String}
});

module.exports = mongoose.model('Solution', solutionSchema);