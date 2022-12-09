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

//register
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const userEmail = await User.findOne({
      email: req.body.email,
    });
    if (userEmail) {
      res.send({ message: "Email already registered!!" });
    }

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({
      status: "ok",
      //message: "Successfully Registered! Please login now",
      // user: req.body,
      //message: `${User.name} Successfully Registered! Please login now `,
    });
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

//quote
app.get("/api/quote", async (req, res) => {
  //get the token from request header
  const token = req.headers["x-access-token"];
  try {
    //perform the authentication
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return { status: "ok", quote: user.quote };
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  //get the token from request header
  const token = req.headers["x-access-token"];
  try {
    //perform the authentication
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return { status: "ok" };
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});
