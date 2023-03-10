const Department = require("../models/Department");

//add department
async function addDepartment(req, res) {
  try {
    const newDepartment = await Department.create(req.body);
    newDepartment.save();
  } catch (error) {
    console.log(error);
    res.status(410).send(error);
  }
}

//get departments
async function getDepartments(req, res) {
  Department.find({})
    .populate("employees")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  addDepartment,
  getDepartments,
};
