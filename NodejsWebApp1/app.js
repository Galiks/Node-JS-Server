const sqlite = require("sqlite3").verbose();
let database = new sqlite.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
})

database.serialize(function () {
    database.run("CREATE TABLE user (id INT PRIMARY KEY, dt TEXT)");

    var stmt = database.prepare("INSERT into user values(?,?)");
    for (var i = 0; i < 10; i++) {
        var d = new Date();
        var n = d.toLocaleDateString();
        stmt.run(i, n);
    }

    stmt.finalize();

    database.each("SELECT id,dt from user", function (err, row) {
        console.log("User id: " + row.id, row.dt);
    });
});

const port = process.env.PORT || 1337;

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/static'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/users.html")
})

//get users
app.get("/api/users", function (req, res) {
    try {
        var content = fs.readFileSync("users.json", "utf-8").toString();
        var users = JSON.parse(content);
        res.send(users);
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.log("File not found");
        }
        else {
            throw e;
        }
    }
    
});

//get user by id
app.get("/api/users/:id", function (req, res) {
    var id = req.params.id;
    var content = fs.readFileSync("users.json", "utf-8").toString();
    var users = JSON.parse(content);
    var user = null;

    //find user by id
    for (var userItem in users) {
        if (userItem.id == id) {
            user = userItem;
            break;
        }
    }

    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send();
    }
});

//create new user
app.post("/api/users", jsonParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var data = fs.readFileSync("users.json", "utf-8");
    var users = JSON.parse(data);

    var id = Math.max.apply(Math, users.map(function (u) { return u.id }));
    var id = id + 1;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var user = { id: id, firstName: firstName, lastName: lastName, email: email, password: password, phone: phone };

    users.push(user);

    data = JSON.stringify(users);

    fs.writeFileSync("users.json", data);
    res.send(user);
});

//delete user
app.delete("/api/users/:id", function (req, res) {

    var id = req.params.id;
    var data = fs.readFileSync("users.json", "utf-8");
    var users = JSON.parse(data);
    var index = -1;

    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            index = i;
        }
    }

    console.log(index);

    if (index > -1) {
        var user = users.splice(index, 1)[0];
        console.log(user);
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else {
        res.status(404).send();
    }
});

//change user
app.put("/api/users/:id", jsonParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var id = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    var data = fs.readFileSync("users.json", "utf-8");
    var users = JSON.parse(data);
    var user = null;

    console.log("find user by id");
    for (var i = 0; i < users.length; i++) {
        console.log(users[i].id);
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }

    console.log(user);
    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.phone = phone;

        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else {
        res.sendStatus(404).send();
    }
});

app.listen(port);

database.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection');
})

//const express = require("express")
//const app = express();
//const port = process.env.PORT || 1337;
//const bodyParser = require("body-parser");
//const jsonParse = express.json();
//const hbs = require("hbs");

//const urlencodedParser = bodyParser.urlencoded({ extended: false });

//hbs.registerHelper("getTime", function () {
//    var myDate = new Date();
//    var hour = myDate.getHours();
//    var minute = myDate.getMinutes();
//    var second = myDate.getSeconds();
//    if (minute < 10) {
//        minute = "0" + minute;
//    }
//    if (second < 10) {
//        second = "0" + second;
//    }
//    return "Текущее время: " + hour + ":" + minute + ":" + second;
//})

//app.set("view engine", "ejs");
//app.set("view engine", "hbs");

//app.use(express.static(__dirname + '/static'));

//app.get("/login", function (req, res) {
//    res.sendFile(__dirname + "/views/login.html");
//});

//app.post("/login", urlencodedParser, function (req, res) {
    
//    if (!req.body) {
//        return res.statusCode(400);
//    }
//    res.send(req.body.login + " - " + req.body.password);
//    //res.sendFile(__dirname + "/views/login.html");
//});

//app.get("/", function (req, res) {
//    res.sendFile(__dirname + "/views/index.html")
//});

//app.post("/user", jsonParse, function (req, res) {
//    //res.sendFile(__dirname + "/views/index.html")
//    if (!req.body) {
//        return res.sendStatus(400);
//    }
//    //res.write(req.body.email + " - " + req.body.password);
//    res.json(req.body);
//});

//app.get("/users/:userId", function (req, res) {
//    res.send("Hello, " + req.params["userId"]);
//});

//app.use("/users", function (req, res) {
//    res.render("users.ejs", {
//        namesVisible: true,
//        title: "Users",
//        name: [
//            "Pavel",
//            "Petr",
//            "Ivan"
//        ],
//        phone: [
//            "123",
//            "456",
//            "789"
//        ]
//    })
//});

//app.listen(port);