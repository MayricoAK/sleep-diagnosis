const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosis');

router.post('/', diagnosisController.diagnose);

module.exports = router;