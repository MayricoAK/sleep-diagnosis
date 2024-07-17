const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  diagnosisDate: { type: Date, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  name: { type: String, required: true },
  height: { type: Number, required: true },  // height in cm
  weight: { type: Number, required: true },  // weight in kg
  BMIcategory: { type: String, required: true },
  sleepDuration: { type: Number, required: true },
  qualityOfSleep: { type: String, required: true },
  physicalActivityInMinute: { type: Number, required: true },
  stressLevel: { type: String, required: true },
  bloodPressure: { type: String, required: true },
  heartRate: { type: Number, required: true },
  dailySteps: { type: Number, required: true },
  sleepDisorder: { type: String },
  solution: { type: String },
  createdAt: { type: String },
  timestamp: { type: String }
});

module.exports = mongoose.model('Diagnosis', diagnosisSchema);