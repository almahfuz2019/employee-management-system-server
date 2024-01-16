const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required: [true, "firstName is required"],
     },
     lastName: {
          type: String,
          required: [true, "lastName is required"],
     },
     position: {
          type: String,
          required: [true, "position is required"],
     },
     salary: {
          type: String,
          required: [true, "salary is required"],
     }
});
const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;
