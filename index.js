require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [
  {
    username: "ksh",
    password: "123",
    title: "t1",
  },
  {
    username: "Pak",
    password: "321",
    title: "t2",
  },
];

app.get("/", (req, res) => {
  res.send({ status: "working" });
});
app.get("/getAllUsers", (req, res) => {
  res.send(users);
});
app.get("/user", authenticationToken, (req, res) => {
  res.json(users.filter((user) => user.username == req.body.username));
});

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401).send({ status: "No token" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
}

app.listen(3000, () => {
  console.log("server is running on 3000");
});
