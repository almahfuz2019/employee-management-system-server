// Import required modules
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
// Load environment variables from .env file
require('dotenv').config();
// Enable (CORS)
app.use(cors());
// for JSON requests
app.use(express.json());
// Get the port from the environment variables
const port = process.env.PORT;
// Enable parsing of URL-encoded requests
app.use(express.urlencoded({ extended: true }));
// Database connection function
async function database() {
     try {
          // Connect to MongoDB URI from the environment variables
          // For testing (.env in github)
          await mongoose.connect(process.env.MONGODB_URI);
          console.log("Database is connected");
     } catch (error) {
          console.log("Database is not connected");
          console.log(error);
     }
}
// Import the employee management routes 
const employee = require("./Routes/employeeManagement");
employee(app);

// Start the server
app.listen(port, async () => {
     console.log(`Server is running at http://localhost:${port}`);
     await database();
});
