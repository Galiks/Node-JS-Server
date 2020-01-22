const express = require("express")
const app = express();
var port = process.env.PORT || 1337;

//app.use("/login", function (req, res) {

//    res.sendFile(__dirname + "/views/login.html");
//})

app.use(express.static('static'));

app.use("/", function (req, res) {
    res.sendFile(__dirname + "/views/login.html");
})

app.listen(port);