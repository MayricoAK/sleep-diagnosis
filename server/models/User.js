const mongoose = require('mongoose');
const Diagnosis = require('./Diagnosis');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    birthdate: { type: Date, required: true },
    diagnoses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis' }],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });

module.exports = mongoose.model('User', userSchema);