const Diagnosis = require('../models/Diagnosis');
const { 
  diagnoseSleepDisorder, 
  calculateBMI,
  getCurrentDate,
  getTimestamp,
  formatDiagnosisDate
} = require('../utils/Utils');

exports.addDiagnose = async (req, res) => {
  try {
    const user = req.user;
    const { sleepDuration, qualityOfSleep, physicalActivity, stressLevel, bloodPressure, heartRate, dailySteps, diagnosisDate, height, weight } = req.body;

    // Use the formatDiagnosisDate function
    const formattedDiagnosisDate = formatDiagnosisDate(diagnosisDate);
    const physicalActivityInMinute = physicalActivity/60;

    const BMI = calculateBMI(weight, height);
    const diagnosisData = {
      uid: user._id,
      diagnosisDate: formattedDiagnosisDate,
      gender: user.gender,
      age: user.age,
      name: user.name,
      height,
      weight,
      BMIcategory: BMI,
      sleepDuration,
      qualityOfSleep,
      physicalActivityInMinute,
      stressLevel,
      bloodPressure,
      heartRate,
      dailySteps,
      createdAt: getCurrentDate(),
      timestamp: getTimestamp()
    };

    const { disorder, solution } = diagnoseSleepDisorder(diagnosisData);
    diagnosisData.sleepDisorder = disorder;
    diagnosisData.solution = solution;

    const newDiagnosis = new Diagnosis(diagnosisData);
    await newDiagnosis.save();

    user.diagnoses.push(newDiagnosis._id);
    await user.save();

    res.status(201).send({ message: 'Diagnosis complete', diagnosis: newDiagnosis });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

exports.getAllDiagnosesByUser = async (req, res) => {
  try {
    const uid = req.user._id;  // User ID from authenticated user
    const diagnoses = await Diagnosis.find({ uid });
    res.status(200).send(diagnoses);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

exports.deleteDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const diagnosis = await Diagnosis.findById(id);
    if (!diagnosis) {
      return res.status(404).send({ message: 'Diagnosis not found' });
    }
    await Diagnosis.findByIdAndDelete(id);
    res.status(200).send({ message: 'Diagnosis deleted' });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};