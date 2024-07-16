const User = require('../models/User');
const Diagnosis = require('../models/Diagnosis');

// Simple function to diagnose sleep disorder
const diagnoseSleepDisorder = (data) => {
  const { sleepDuration, qualityOfSleep, physicalActivityLevel, stressLevel, bloodPressure, heartRate, dailySteps } = data;
  if (sleepDuration < 4 || sleepDuration > 10 || qualityOfSleep === 'poor' || stressLevel === 'high') {
    return { disorder: 'Possible sleep disorder detected', solution: 'Consult a sleep specialist, maintain a regular sleep schedule, reduce stress.' };
  } else {
    return { disorder: 'Normal sleep patterns', solution: 'Continue maintaining healthy sleep habits.' };
  }
};

exports.addDiagnose = async (req, res) => {
  try {
    const { uid, date, gender, age, name, BMIcategory, sleepDuration, qualityOfSleep, physicalActivityLevel, stressLevel, bloodPressure, heartRate, dailySteps } = req.body;

    const diagnosisData = {
      uid,
      date,
      gender,
      age,
      name,
      BMIcategory,
      sleepDuration,
      qualityOfSleep,
      physicalActivityLevel,
      stressLevel,
      bloodPressure,
      heartRate,
      dailySteps,
      timestamp: new Date()
    };

    const { disorder, solution } = diagnoseSleepDisorder(diagnosisData);
    diagnosisData.sleepDisorder = disorder;
    diagnosisData.solution = solution;

    const newDiagnosis = new Diagnosis(diagnosisData);
    await newDiagnosis.save();

    let user = await User.findOne({ _id: uid });
    if (!user) {
      user = new User({ _id: uid, name, age, gender, diagnoses: [newDiagnosis._id] });
    } else {
      user.diagnoses.push(newDiagnosis._id);
    }
    await user.save();

    res.status(201).send({ message: 'Diagnosis complete', diagnosis: newDiagnosis });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

exports.getAllDiagnosesByUser = async (req, res) => {
  try {
    const uid = req.user._id;  // Assuming user ID is set in req.user by the auth middleware
    const diagnoses = await Diagnosis.find({ uid });
    res.status(200).send(diagnoses);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

exports.editDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedDiagnosis = await Diagnosis.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).send({ message: 'Diagnosis updated', diagnosis: updatedDiagnosis });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

exports.deleteDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    await Diagnosis.findByIdAndDelete(id);
    res.status(200).send({ message: 'Diagnosis deleted' });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};