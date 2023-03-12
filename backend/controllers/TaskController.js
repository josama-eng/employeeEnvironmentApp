const Task = require("../models/Task");
const Employee = require("../models/Employee");

//add task

async function addTask(req, res) {
  try {
    console.log(req.body);
    const newTask = await Task.create(req.body);
    newTask.save().then(() => {
      Employee.findById(req.body.assignee).then((assignee) => {
        assignee.tasks.push(newTask._id);
        assignee.save();
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(415).send(error);
  }
}

//get all tasks

async function getTasks(req, res) {
  try {
    const allEmployees = await Task.find({})
      .populate("assignee", "fullName")
      .exec();
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

//get one task
async function getTask(req, res) {
  try {
    const { id } = req.params;
    const taskDetails = await Task.find({ _id: id })
      .populate("assignee", "fullName")
      .exec();
    if (taskDetails) {
      return res.status(200).send(taskDetails);
    } else {
      return res.status(415).send("Something went wrong");
    }
  } catch (error) {
    res.status(415).send(error);
  }
}

async function updateTask(req, res) {
  const body = req.body;
  const taskId = body.id;
  console.log(body);
  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, body, {
      new: true,
    }).then(() => {
      const employee = Employee.findOne({ _id: updatedTask.assignee });
      employee.tasks.push(taskId);
    });
    res.status(220).send("Successfuly updated");
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
}

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  getTask,
  updateTask,
};
