const express = require("express");
const { connection } = require("./config/db");
const { accountRouter } = require("./routes/account.route");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("", accountRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
    res.send("cannot connect to db");
  }
  console.log(`server running at port ${process.env.port}`);
});

// {
//   "name":"Rajesh",
//   "gender":"Male",
//   "dob":07051995,
//   "email":"rajesh@gmail.com",
//   "mobile":9963442006,
//   "address":"hno:3road5",
//   "initialBalance":10000,
//   "adharNo":3449898295345,
//   "panNo":"PAN2782PS"
// }
