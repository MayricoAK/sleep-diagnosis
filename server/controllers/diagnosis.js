const User = require('../models/User');
const Diagnosis = require('../models/Diagnosis');

// Fungsi sederhana untuk mendiagnosis gangguan tidur
const diagnoseSleepDisorder = (data) => {
  const { sleepDuration, qualityOfSleep, physicalActivityLevel, stressLevel, bloodPressure, heartRate, dailySteps } = data;
  // Logika diagnosis sederhana
  if (sleepDuration < 4 || sleepDuration > 10 || qualityOfSleep === 'poor' || stressLevel === 'high') {
    return { disorder: 'Possible sleep disorder detected', solution: 'Consult a sleep specialist, maintain a regular sleep schedule, reduce stress.' };
  } else {
    return { disorder: 'Normal sleep patterns', solution: 'Continue maintaining healthy sleep habits.' };
  }
};

exports.diagnose = async (req, res) => {
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