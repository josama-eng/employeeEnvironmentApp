require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./db/connect");
const employeeRouter = require("./routes/employee");
const taskRouter = require("./routes/task");
const departmentRouter = require("./routes/department");

//middleware
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

//routes
app.use(employeeRouter);
app.use(taskRouter);
app.use(departmentRouter);

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
