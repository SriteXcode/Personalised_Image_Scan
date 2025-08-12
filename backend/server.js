const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const nameRoute = require('./routes/nameRoute'); // ✅ Importing the route
const NameModel = require('./models/Name'); // ✅ IMPORTANT: This line
const uploadRoute = require('./routes/uploadRoute'); // ✅ Importing the upload route
const upload = require('./middleware/upload'); // ✅ Importing the upload middleware

const app = express();
const PORT = process.env.PORT || 5000;


// lets tackle cors
  const allowedOrigins = [
  "http://localhost:5173",
  "https://personalised-image-scan-1.onrender.com"  // 👈 your deployed frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};


  app.use(cors(corsOptions));
  app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api', async(req, res) => {
  //  res.send('Hello from backend 🎉');
  try {
    const names = await NameModel.find();
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching names', error });
  }
});
app.get('/api', async(req, res) => {
  //  res.send('Hello from backend 🎉');
  try {
    const names = await NameModel.find();
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching names', error });
  }
});
app.use('/api/name', nameRoute); // ✅ Using the route
app.use('/api/image', uploadRoute);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
