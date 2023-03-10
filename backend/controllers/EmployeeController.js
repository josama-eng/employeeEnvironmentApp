const Employee = require("../models/Employee");
const dayjs = require("dayjs");
const Task = require("../models/Task");

//get 5 employees who completed the largest number of tasks in past month

async function getTopEmployees(req, res) {
  const startOfMonth = dayjs().subtract(1, "month").startOf("month").toDate();
  const endOfMonth = dayjs().subtract(1, "month").endOf("month").toDate();

  const tasks = await Task.find({
    dueDate: { $gte: startOfMonth, $lte: endOfMonth },
  }).exec();

  const tasksByEmployee = {};

  tasks.forEach((task) => {
    const employeeId = task.assignee;

    if (!tasksByEmployee[employeeId]) {
      tasksByEmployee[employeeId] = 1;
    } else {
      tasksByEmployee[employeeId]++;
    }
  });

  const topFiveEmployees = await Employee.find({
    _id: { $in: Object.keys(tasksByEmployee) },
  }).limit(5);
  // .sort((a, b) => tasksByEmployee[b] - tasksByEmployee[a])
  // .limit(5)
  // .exec();

  console.log(topFiveEmployees);
}

//add employee
async function addEmpoloyee(req, res) {
  try {
    const newEmployee = await Employee.create(req.body);
    newEmployee.save();
  } catch (error) {
    console.log(error);
    return res.status(415).send(error);
  }
}

//get employees

async function getEmployees(req, res) {
  try {
    Employee.find({})
      .populate("tasks")
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(415).send(error);
  }
}

//get one employee
async function getOneEmployee(req, res) {
  try {
    const { id } = req.params;
    Employee.find({ _id: id })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(415).send(Error);
  }
}

//delete employee
async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    Employee.findByIdAndDelete(id)
      .then((result) => res.status(200).send("Employee deleted successfully"))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(415).send(error);
  }
}

//get averageSalary for employees

async function getAverageSalary(req, res) {
  Employee.aggregate([
    {
      $group: {
        _id: null,
        averageSalary: { $avg: "$monthlySalary" },
      },
    },
  ])
    .then((result) => console.log(result))
    .catch((error) => res.status(415).send(error));
}

module.exports = {
  addEmpoloyee,
  getAverageSalary,
  getEmployees,
  getOneEmployee,
  deleteEmployee,
  getTopEmployees,
};
