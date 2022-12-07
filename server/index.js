const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//app use cors as a middleware
app.use(cors());
app.use(express.json());

//connect with mongoose
mongoose.connect(
  "mongodb://localhost:27017/full-mern-stack-auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected successfully!!");
  }
);

app.post("/api/register", (req, res) => {
  console.log(req.body);
  res.json({ status: "ok" });
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});
