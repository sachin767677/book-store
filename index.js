const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected!'))
  .catch((err) => console.error(' MongoDB connection error:', err.message));


const userSchema = new mongoose.Schema({
  name: String,
  mobileNumber: String,
});

const User = mongoose.model('User', userSchema);

// POST route
app.post('/submit', async (req, res) => {
  const { name, mobileNumber } = req.body;

  try {
    const user = new User({ name, mobileNumber });
    await user.save();
    res.json({
      message: `Thank you, ${name}! Your mobile number ${mobileNumber} has been received.`,
    });
  } catch (error) {
    console.error(' Error saving user:', error.message);
    res.status(500).json({ message: 'Error saving data to the database.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
