const express = require("express");
const app = express();

//set the template engine ejs
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

//Listen on port 3000
server = app.listen(3000);

//socket.io instantiation
const io = require("socket.io")(server);

//listen on every connection
io.on("connection", (socket) => {
  console.log("User Connected");

  // default username
  socket.username = "Anonymous";

  //listen on change_username
  socket.on("change_username", (data) => {
    socket.username = data.username;
  });

  // listen on screen
  socket.on("screen", (data) => {
    // broadcast the new screen
    io.sockets.emit("screen", {
      screen: data.screen,
      username: socket.username,
    });
  });
});
