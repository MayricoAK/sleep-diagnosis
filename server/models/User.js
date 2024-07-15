const mongoose = require('mongoose');
const Diagnosis = require('./Diagnosis');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  diagnoses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis' }]
});

module.exports = mongoose.model('User', UserSchema);