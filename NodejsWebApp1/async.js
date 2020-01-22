module.exports.func = function (data, callback) {

    var random = Math.random() * (10 - 1) + 1;
    var error = random > 5 ? new Error("ERROR") : null;

    setTimeout(function () {
        callback(error, data);
    }, 0);
}

//func("Обработка данных", function (err, data) {
//    if (err) {
//        throw err;
//    }
//    else {
//        return data;
//    }
//})