const express = require("express");
const router = new express.Router();
const Employee = require("../models/Employee");
const employeeController = require("../controllers/EmployeeController");

//add employee

router.post("/employee", employeeController.addEmpoloyee);

//getAverageSalary
router.get("/employee/averageSalary", employeeController.getAverageSalary);

//top 5 employees
router.get("/employee/topFive", employeeController.getTopEmployees);

//get employees
router.get("/employee/all", employeeController.getEmployees);

//get one employee
router.get("/employee/:id", employeeController.getOneEmployee);

//delete employee
router.delete("/employee/:id", employeeController.deleteEmployee);

module.exports = router;
