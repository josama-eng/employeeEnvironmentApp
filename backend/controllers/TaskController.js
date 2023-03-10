const Task = require("../models/Task");

//add task

async function addTask(req, res) {
  try {
    const newTask = await Task.create(req.body);
    newTask.save();
  } catch (error) {
    console.log(error);
    return res.status(415).send(error);
  }
}

//get all tasks

async function getTasks(req, res) {
  try {
    const allEmployees = await Task.find({});
    return res.status(220).send(allEmployees);
  } catch (error) {
    return res.status(440).send(error);
  }
}

//delete task

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    Task.findByIdAndDelete(id)
      .then(() => {
        return res.status(204).send("Task deleted successfully");
      })
      .catch((error) => {
        return res.status(425).send(error);
      });
  } catch (error) {
    res.status(425).send(error);
  }
}

module.exports = {
  addTask,
  getTasks,
  deleteTask,
};
