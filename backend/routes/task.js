const express = require("express");
const router = new express.Router();
const Task = require("../models/Task");
const taskController = require("../controllers/TaskController");

//add task

router.post("/task", taskController.addTask);

//get tasks
router.get("/task/all", taskController.getTasks);

//delete task
router.delete("/task/:id", taskController.deleteTask);

//get one task
router.get("/task/:id", taskController.getTask);

module.exports = router;
