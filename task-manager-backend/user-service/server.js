const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require("./config/db");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));



// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Error: ", err.message);
  res.status(500).json({ message: err.message });
});



