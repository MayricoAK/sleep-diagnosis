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
function calculateBMI(weight, height){
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

module.exports = {
    diagnoseSleepDisorder,
    calculateBMI,
    getCurrentDate,
    getTimestamp,
    formatDiagnosisDate,
};