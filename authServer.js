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

var refreshTokens = [];
// app.get("/user", authenticationToken, (req, res) => {
//   res.json(users.filter((user) => user.username == req.body.username));
// });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username == username && user.password == password
  );
  if (user == null) {
    res.send({ status: "user not found" });
  } else {
    const accessTokenT = generateAccessToken({ name: user.name });
    const refreshTokenT = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshTokenT);
    res.send({ accessToken: accessTokenT, refreshToken: refreshTokenT });
  }
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token != req.body.token);
  console.log("hell");
  return res.send({ status: "Refresh token deleted" });
});

// function authenticationToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) {
//     res.status(401).send({ status: "No token" });
//   } else {
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//     });
//   }
// }

function generateAccessToken(user) {
  return (accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  }));
}

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).send({ status: "refresh token didn't exit" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessTokenT = generateAccessToken({ name: user.name });
    res.send({ accessToken: accessTokenT });
  });
});

app.listen(4000, () => {
  console.log("server is running on 4000");
});
