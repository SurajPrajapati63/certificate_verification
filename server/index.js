const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const certificateRoutes = require('./routes/certificateRoutes');
const chalk = require('chalk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green("Connected to MongoDB successfully"));
  } catch (err) {
    console.error(chalk.red("MongoDB connection error:"), err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Routes
app.use('/api/certificates', certificateRoutes);

// Start the server
const startServer = async () => {
  await connectDB(); // Wait for the DB connection to complete
  app.listen(PORT, () => {
    console.log(chalk.greenBright.bold(`Server started running on port ${PORT}... 🛜`));
  });
};

startServer();
