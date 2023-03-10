const express = require("express");
const router = new express.Router();
const departmentController = require("../controllers/DepartmentController");
const { modelName } = require("../models/Employee");

//add department
router.post("/department", departmentController.addDepartment);

//get departments
router.get("/department/all", departmentController.getDepartments);

module.exports = router;
