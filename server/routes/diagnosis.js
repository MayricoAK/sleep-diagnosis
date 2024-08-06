const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosis');
const authMiddleware = require('../middleware/auth');

// Route to add a new diagnosis
router.post('/', authMiddleware, diagnosisController.addDiagnose);

// Route to get all diagnoses by user
router.get('/', authMiddleware, diagnosisController.getAllDiagnosesByUser);

// Route to get detail of diagnosis by id diagnosis
router.get('/:id', authMiddleware, diagnosisController.getDiagnosisById);

// Route to delete a diagnosis by id diagnosis
router.delete('/:id', authMiddleware, diagnosisController.deleteDiagnosis);

module.exports = router;