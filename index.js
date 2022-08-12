const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [
  {
    username: "ksh",
    password: "123",
  },
];

app.get("/", (req, res) => {
  res.send({ status: "working" });
});
app.get("/getAllUsers", (req, res) => {
  res.send(users);
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
