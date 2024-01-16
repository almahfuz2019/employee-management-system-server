const employeeDataModel = require("../Models/employeeModel");
function employeeManagement(app) {

     // Search data by lastName
     app.get("/search-by-lastName", async (req, res) => {
          try {
               const searchLastName = req.query.lastName;
               if (!searchLastName) {
                    return res.status(400).send({ message: "Missing last name" });
               }
               const searchData = await employeeDataModel.find({
                    lastName: { $regex: new RegExp(searchLastName, "i") },
               });
               res.status(200).send(searchData);
          } catch (error) {
               res.status(500).send({ message: error.message });
          }
     });

     // Drop the collection
     app.delete("/drop-collection", async (req, res) => {
          try {
               await employeeDataModel.collection.drop();
               res.status(200).send({ message: "Collection dropped successfully" });
          } catch (error) {
               res.status(500).send({ message: error.message });
          }
     });

     //employees count length
     app.get("/collection-length", async (req, res) => {
          try {
               const collectionLength = await employeeDataModel.countDocuments();
               res.status(200).send({ collectionLength });
          } catch (error) {
               res.status(500).send({ message: error.message });
          }
     });

     // Create a new employee 
     // app.post("/", async (req, res) => {
     //      try {
     //           const newEmployee = new employeeDataModel({
     //                firstName: req.body.firstName,
     //                lastName: req.body.lastName,
     //                position: req.body.position,
     //                salary: req.body.salary,
     //           });
     //           const data = await newEmployee.save();
     //           res.status(201).send({ data });
     //      } catch (error) {
     //           res.status(500).send({ message: error.message });
     //      }
     // });
     app.post("/", async (req, res) => {
          try {
               // Check if the employee already exists based on first name and last name
               const existingEmployee = await employeeDataModel.findOne({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
               });

               if (existingEmployee) {
                    // Employee with the same first name and last name already exists
                    return res.status(400).send({ message: 'Employee already exists' });
               }
               const newEmployee = new employeeDataModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    position: req.body.position,
                    salary: req.body.salary,
               });
               const data = await newEmployee.save();
               res.status(201).send({ data });
          } catch (error) {
               res.status(500).send({ message: error.message });
          }
     });


     // Get all employees
     app.get("/allemployees", async (req, res) => {
          try {
               const readAllEmployees = await employeeDataModel.find();
               if (readAllEmployees.length === 0) {
                    res.status(200).send({ message: "No employees found." });
               } else {
                    res.status(200).send(readAllEmployees);
               }
          } catch (error) {
               res.status(500).send({ message: error.message });
          }
     });

     // Get a specific employee data by ID
     app.get("/:id", async (req, res) => {
          try {
               const id = req.params.id;
               const readEmployeeData = await employeeDataModel.findOne({ _id: id });
               if (readEmployeeData) {
                    res.status(200).send(readEmployeeData);
               } else {
                    res.status(404).send({ message: "The requested employee could not be found. Please check the employee ID and try again." });
               }
          } catch (error) {
               res.status(500).send({ message: error.message });
          }
     });

     // Delete a specific employee by ID
     app.delete("/:id", async (req, res) => {
          try {
               const id = req.params.id;
               const employeeData = await employeeDataModel.deleteOne({ _id: id });
               if (employeeData.deletedCount > 0) {
                    res.status(200).send({ message: "Employee deleted successfully" });
               } else {
                    res.status(404).send({ message: "Employee not found" });
               }
          } catch (error) {
               res.status(500).send({ message: error.message });
          }
     });

     // Update a specific employee by ID
     app.put("/:id", async (req, res) => {
          try {
               const id = req.params.id;
               const employeeData = await employeeDataModel.updateOne(
                    { _id: id },
                    {
                         $set: {
                              firstName: req.body.firstName,
                              lastName: req.body.lastName,
                              position: req.body.position,
                              salary: req.body.salary,
                         },
                    }
               );
               if (employeeData) {
                    res.status(200).send(employeeData)
               } else {
                    res.status(404).send({ message: "Employee is not deleted" })
               }
          } catch (error) {
               res.status(500).send({ message: error.message });
          }
     });
}
module.exports = employeeManagement;