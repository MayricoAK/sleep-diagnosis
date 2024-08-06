const moment = require("moment");

// Function to diagnose sleep disorder
const diagnoseSleepDisorder = (data) => {
    const { sleepDuration, qualityOfSleep, physicalActivityLevel, stressLevel, bloodPressure, heartRate, dailySteps } = data;
    if (sleepDuration < 4 || sleepDuration > 10 || qualityOfSleep === 'poor' || stressLevel === 'high') {
      return { disorder: 'Possible sleep disorder detected', solution: 'Consult a sleep specialist, maintain a regular sleep schedule, reduce stress.' };
    } else {
      return { disorder: 'Normal sleep patterns', solution: 'Continue maintaining healthy sleep habits.' };
    }
};

// Function to calculate BMI
function calculateBMI(height, weight){
  const heightInMeters = height / 100;
  const BMI = weight / (heightInMeters ** 2);
  let BMIcategory;
    if (BMI < 25) {
      return BMIcategory = 'Normal';
    } else if (BMI < 30) {
      return BMIcategory = 'Overweight';
    } else {
      return BMIcategory = 'Obese';
    }
}

// Function to get current date
function getCurrentDate(){
    return moment().toDate();
}

// Function to get timestamp
function getTimestamp(){
    return moment().toDate();
}

// Function to format diagnosis date from dd-mm-yyyy to Date object
function formatDiagnosisDate(date) {
    return moment(date, "DD-MM-YYYY").toDate();
}

// Function to calculate age from birthDate
function calculateAgeFromBirthDate(birthDate) {
    return moment().diff(moment(birthDate, "YYYY-MM-DD"), 'years');
}

// Menghitung Sleep Quality
function calculateSleepQuality(qualityOfSleep) {
    if (qualityOfSleep >= 4 && qualityOfSleep <= 9) {
      return qualityOfSleep - 4;
    } else if (qualityOfSleep < 4) {
      return 0;
    } else {
      return 5;
    }
  }

// Menghitung Stress Level
function calculateStressLevel(stressLevel) {
  if (stressLevel >= 3 && stressLevel <= 8) {
    return stressLevel - 3;
  } else if (stressLevel < 3) {
    return 0;
  } else {
    return 5;
  }
}

function convertBMI(BMIcategory) {
  let category = 0;
  if (BMIcategory === 'Obese') {
    category = 1;
  } else if (BMIcategory === 'Overweight') {
    category = 2;
  }

  return category;
}

// Menghitung BP Category
function calculateBPCategory(bloodPressure) {
  switch (bloodPressure) {
    case 'Normal':
      return 1;
    case 'Stage 1':
      return 2;
    case 'Stage 2':
      return 3;
    default:
      return 0;
  }
}

module.exports = {
    diagnoseSleepDisorder,
    calculateBMI,
    getCurrentDate,
    getTimestamp,
    formatDiagnosisDate,
    calculateAgeFromBirthDate,
    calculateSleepQuality,
    calculateStressLevel,
    convertBMI,
    calculateBPCategory,
};