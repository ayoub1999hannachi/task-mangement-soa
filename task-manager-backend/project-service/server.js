const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Project service running on port ${PORT}`));
