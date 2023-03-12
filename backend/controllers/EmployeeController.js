const Employee = require("../models/Employee");
const dayjs = require("dayjs");
const Task = require("../models/Task");
const Department = require("../models/Department");

//get 5 employees who completed the largest number of tasks in past month

async function getTopEmployees(req, res) {
  try {
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
    return res.status(200).send(topFiveEmployees);
  } catch (error) {
    return res.status(425).send(error);
  }
}

//add employee
async function addEmpoloyee(req, res) {
  try {
    console.log(req.body);
    const newEmployee = await Employee.create(req.body);
    newEmployee
      .save()
      .then(() => {
        Department.findById(req.body.department)
          .then((department) => {
            department.employees.push(newEmployee._id);
            department.save();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    return res.status(425).send(error);
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
    console.log(id);
    Employee.findByIdAndDelete(id)
      .then((result) => res.status(200).send("Employee deleted successfully"))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(415).send(error);
  }
}

//update employee

async function updateEmployee(req, res) {
  const body = req.body;
  const employeeId = body.id;
  try {
    console.log(req.body);
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: employeeId },
      body,
      { new: true }
    );
    res.status(220).send("Successfuly updated");
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
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
    .then((result) => res.status(220).send(result))
    .catch((error) => res.status(415).send(error));
}

module.exports = {
  addEmpoloyee,
  getAverageSalary,
  getEmployees,
  getOneEmployee,
  deleteEmployee,
  getTopEmployees,
  updateEmployee,
};
