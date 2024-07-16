const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    date: { type: Date, default: Date.now },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    name: { type: String, required: true },
    BMIcategory: { type: String, required: true },
    sleepDuration: { type: Number, required: true },
    qualityOfSleep: { type: String, required: true },
    physicalActivityLevel: { type: String, required: true },
    stressLevel: { type: String, required: true },
    bloodPressure: { type: String, required: true },
    heartRate: { type: Number, required: true },
    dailySteps: { type: Number, required: true },
    sleepDisorder: { type: String },
    solution: { type: String },
    timestamp: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Diagnosis', diagnosisSchema);