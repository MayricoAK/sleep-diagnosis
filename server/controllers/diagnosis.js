const Diagnosis = require('../models/Diagnosis');
const Solution = require('../models/Solution'); // Import Solution model
const axios = require('axios');
const dotenv = require('dotenv');
const moment = require('moment');
const {
  formatDiagnosisDate,
  calculateBMI,
  calculateSleepQuality,
  calculateStressLevel,
  convertBMI,
  calculateBPCategory
} = require('../utils/Utils');
const dayjs = require('dayjs');
dotenv.config();

exports.addDiagnose = async (req, res) => {
  try {
    const user = req.user;
    const { sleepDuration, qualityOfSleep, physicalActivity, stressLevel, bloodPressure, heartRate, dailySteps, diagnosisDate, height, weight } = req.body;

    const physicalActivityInMinute = physicalActivity * 60; // Assuming input in hours
    const BMI = calculateBMI(height, weight);

    const diagnosisData = {
      uid: user._id,
      diagnosisDate: formatDiagnosisDate(diagnosisDate),
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
      dailySteps
    };

    const modelApiInput = {
      Gender: diagnosisData.gender === 'Male' ? 1 : 0,
      Age: diagnosisData.age,
      Sleep_Duration: sleepDuration,
      Sleep_Quality: calculateSleepQuality(qualityOfSleep),
      Physical_Activity_Level: physicalActivityInMinute,
      Stress_Level: calculateStressLevel(stressLevel),
      BMI_Category: convertBMI(BMI),
      Heart_Rate: heartRate,
      Daily_Steps: dailySteps,
      BP_Category: calculateBPCategory(bloodPressure)
    };

    // Send data to Flask model API for prediction
    const modelApiResponse = await axios.post(process.env.SLEEP_DISORDER_MODEL, modelApiInput);
    const sleepDisorderPrediction = modelApiResponse.data.sleep_disorder;

    // Fetch solution based on the sleep disorder prediction
    const solutionData = await Solution.findOne({ diagnosis: sleepDisorderPrediction });
    const solution = solutionData ? solutionData.solution : 'No solution available';

    // Create a new diagnosis object
    const newDiagnosis = new Diagnosis({
      ...diagnosisData,
      sleepDisorder: sleepDisorderPrediction,
      solution: solution
    });

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
    const uid = req.user._id;

    // Retrieve and sort diagnoses by diagnosisDate in descending order
    const diagnoses = await Diagnosis.find({ uid }).sort({ diagnosisDate: -1 });

    // Format dates using moment
    const formattedDiagnoses = diagnoses.map(diagnosis => ({
      ...diagnosis._doc,
      diagnosisDate: moment(diagnosis.diagnosisDate).format('DD-MM-YYYY'),
      createdAt: moment(diagnosis.createdAt).format('DD-MM-YYYY'),
      timestamp: moment(diagnosis.timestamp).format('DD-MM-YYYY'),
      physicalActivity: diagnosis.physicalActivityInMinute,
    }));

    res.status(200).send(formattedDiagnoses);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
    // console.log(err.message);
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

// Controller to get diagnosis details by ID
exports.getDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the diagnosis by ID
    const diagnosis = await Diagnosis.findById(id);

    // Check if the diagnosis exists
    if (!diagnosis) {
      return res.status(404).send({ message: 'Diagnosis not found' });
    }

    // Send the diagnosis data
    res.status(200).send(diagnosis);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};