const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const conn = require("../db/connect");
const ObjectID = mongoose.Schema.Types.ObjectID;

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: ObjectID,
        ref: "Employee",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);
