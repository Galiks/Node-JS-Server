'use strict';
var http = require('http');
var fileStream = require("fs");
var port = process.env.PORT || 1337;
var login = false;
var express = require("express");
var app = express();

//http.createServer(function (req, res) {
//    res.setHeader("Content-Type", "text/html; charset=utf-8;");

//    if (req.url === "/home" || req.url === "/") {
//        //if (!login) {
//        //    res.statusCode = 302;
//        //    res.setHeader("Location", "/login");
//        //}
        
//        res.write("<p>Home</p>");

        

//            //const User = require("./user");
//            //let user = new User(1, "Pavel", "Turchenkov", "test.test@test.ru", 1234);
//            //res.write(user.displayInfo());

//            //const os = require("os");
//            //const greeting = require("./greeting");
//            //let username = os.userInfo().username;
//            //res.write("Дата запроса: " + greeting.date);
//            //res.write(greeting.getMessage(username));

        

//        res.end();
//    }
//    else if (req.url === "/login") {
//        res.write("<p>Login</p>");
//        login = true;
//        res.end();
//    }
//    else {
//        const filePath = req.url.substr(1);

//        fileStream.readFile(filePath, function (error, data) {
//            if (error) {
//                res.statusCode = 404;
//                res.end("Resourse not found");
//            }
//            else {
//                if (filePath === "index.html") {
//                    let header = "main PAGE";
//                    let message = "You on main page";
//                    data = data.toString().replace("{header}", header).replace("{message}", message);
//                }
//                else if (filePath === "login.html") {
//                    let header = "login PAGE";
//                    let message = "You on login page";
//                    data = data.toString().replace("{header}", header).replace("{message}", message);
//                }
//                res.end(data);
//            }
//        })
//    }

    

//}).listen(port);