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
    return moment().format("DD-MM-YYYY");
}

// Function to get timestamp
function getTimestamp(){
    return moment().format("DD-MM-YYYY/hh:mm:ss");
}

// Function to format diagnosis date
function formatDiagnosisDate(date) {
    const formattedDate = moment(date, 'DD-MM-YYYY').toDate();
    if (!formattedDate || !moment(formattedDate).isValid()) {
        throw new Error('Invalid date format. Expected YYYY-MM-DD.');
    }
    return formattedDate;
}

module.exports = {
    diagnoseSleepDisorder,
    calculateBMI,
    getCurrentDate,
    getTimestamp,
    formatDiagnosisDate,
};