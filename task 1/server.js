const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

// Load environment variables
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1", // Replace with your frontend domain
  optionsSuccessStatus: 200,
};
// Enable CORS
app.use(cors());

// Bodyparser middleware
app.use(bodyParser.json());

// MongoDB connection using env variable
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
