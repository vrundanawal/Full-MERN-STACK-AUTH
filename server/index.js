const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

//app use cors as a middleware
app.use(cors());
app.use(express.json());

//connect with mongoose
mongoose.connect(
  "mongodb://localhost:27017/full-mern-stack-auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("DB Connected successfully!!");
  }
);

// app.post("/api/register", (req, res) => {
//   console.log(req.body);
//   res.json({ status: "ok" });
// });

//register
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

//login
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    //add jwt token
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});
