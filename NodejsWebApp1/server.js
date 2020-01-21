'use strict';
var http = require('http');
var fileStream = require("fs");
var port = process.env.PORT || 1337;
var login = false;

http.createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8;");

    if (req.url === "/home" || req.url === "/") {
        if (!login) {
            res.statusCode = 302;
            res.setHeader("Location", "/login");
        }
        else {
            res.write("<p>Home</p>");
        }
        res.end();
    }
    else if (req.url === "/login") {
        res.write("<p>Login</p>");
        login = true;
        res.end();
    }
    else {
        const filePath = req.url.substr(1);

        fileStream.readFile(filePath, function (error, data) {
            if (error) {
                res.statusCode = 404;
                res.end("Resourse not found");
            }
            else {
                if (filePath === "index.html") {
                    let header = "main PAGE";
                    let message = "You on main page";
                    data = data.toString().replace("{header}", header).replace("{message}", message);
                }
                else if (filePath === "login.html") {
                    let header = "login PAGE";
                    let message = "You on login page";
                    data = data.toString().replace("{header}", header).replace("{message}", message);
                }
                res.end(data);
            }
        })

        //fileStream.access(filePath, fileStream.constants.R_OK, Error => {
        //    if (Error) {
        //        res.statusCode = 404;
        //        res.end("Resourse not found");
        //    }
        //    else {
        //        fileStream.createReadStream(filePath).pipe(res);
        //    }
        //})
    }

    

}).listen(port);


