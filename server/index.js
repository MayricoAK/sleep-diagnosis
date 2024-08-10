const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const diagnosisRoutes = require('./routes/diagnosis');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');
const Solution = require('./models/Solution')
const {
  dataDiagnosisSolution
} = require('./data/index');
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use('/diagnosis', diagnosisRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() =>{ 
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  // Solution.insertMany(dataDiagnosisSolution);
}).catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
  res.send(`
    <h1>ACCESS, FLASH!</h1>
  `);
});