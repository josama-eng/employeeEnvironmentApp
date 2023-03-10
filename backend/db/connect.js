const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("success");
});

mongoose.set("strictQuery", false);
