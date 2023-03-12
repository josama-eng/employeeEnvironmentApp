const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const conn = require("../db/connect");

const ObjectID = mongoose.Schema.Types.ObjectID;

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    monthlySalary: {
      type: Number,
      required: true,
    },
    tasks: [
      {
        type: ObjectID,
        ref: "Task",
      },
    ],
    department: {
      type: ObjectID,
      ref: "Department",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
