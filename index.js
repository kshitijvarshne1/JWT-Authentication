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

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((user) => user.username == username);
  if (user == null) {
    res.send({ status: "user not found" });
  }
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
