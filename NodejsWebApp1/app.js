const express = require("express")
const app = express();
const port = process.env.PORT || 1337;
const bodyParser = require("body-parser");
const jsonParse = express.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/static'));

app.get("/login", urlencodedParser, function (req, res) {

    res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", urlencodedParser, function (req, res) {
    
    if (!req.body) {
        return res.statusCode(400);
    }
    res.send(req.body.login + " - " + req.body.password);
    //res.sendFile(__dirname + "/views/login.html");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
});

app.post("/user", jsonParse, function (req, res) {
    //res.sendFile(__dirname + "/views/index.html")
    if (!req.body) {
        return res.sendStatus(400);
    }
    //res.write(req.body.email + " - " + req.body.password);
    res.json(req.body);
});

app.get("/users/:userId", function (req, res) {
    res.send("Hello, " + req.params["userId"]);
});

app.get("/users", function (req, res) {
    res.send("Users here");
});

app.listen(port);