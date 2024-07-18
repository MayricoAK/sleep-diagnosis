const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const diagnosisRoutes = require('./routes/diagnosis');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/diagnose', diagnosisRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
