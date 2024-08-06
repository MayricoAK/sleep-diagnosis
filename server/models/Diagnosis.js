const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  name: { type: String, required: true }, // Nama pengguna
  gender: { type: String, required: true }, // Jenis kelamin pengguna
  age: { type: Number, required: true }, // Umur pengguna
  height: { type: Number, required: true, min: 1 }, // Tinggi pengguna (dalam cm)
  weight: { type: Number, required: true, min: 1 }, // Berat pengguna (dalam kg)
  BMIcategory: { type: String, required: true }, // Kategori BMI pengguna
  sleepDuration: { type: Number, required: true, max: 24}, // Durasi tidur pengguna (jam)
  qualityOfSleep: { type: Number, required: true, min: 1, max: 10 }, // Kualitas tidur pengguna (maks 10)
  physicalActivityInMinute: { type: Number, required: true }, // Durasi aktivitas fisik dalam sehari (menit)
  stressLevel: { type: Number, required: true, min: 1, max: 10 }, // Tingkat stres pengguna (maks 10)
  bloodPressure: { type: String, required: true }, // Tekanan darah pengguna
  heartRate: { type: Number, required: true }, // Detak jantung pengguna
  dailySteps: { type: Number, required: true }, // Langkah harian pengguna
  sleepDisorder: { type: String }, // Hasil diagnosis pengguna
  solution: { type: String }, // Solusi berdasarkan diagnosis
  diagnosisDate: { type: Date, required: true }, // Tanggal diagnosis
  createdAt: { type: Date, default: Date.now }, // Tanggal pembuatan
  timestamp: { type: Date, default: Date.now } // Tanda waktu
});

module.exports = mongoose.model('Diagnosis', diagnosisSchema);