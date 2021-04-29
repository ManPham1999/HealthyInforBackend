// 3rd packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

// connect mongoose
const { mongoURI } = require("./config/keys");
const { User } = require("./models/user.model");
const { Friend } = require("./models/Friend.model");

// create app by express
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// Middleware : cors
app.use(cors());

// create port
const port = process.env.PORT || 5000;

// mongoose connect to db
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("TCL: err", err));

// Middleware : body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  );
  next();
});

app.use("/api/user", require("./routers/api/Users/index"));
//socket.io

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.on("chat message", (msg) => {
    console.log(`data of ${socket.id}: ` +msg?.avatar);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

http.listen(port, () => {
  console.log("connect success full " + port);
});
module.exports = app;
