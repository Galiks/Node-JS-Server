let currentDate = new Date();
module.exports.date = currentDate;

module.exports.getMessage = function (name) {
    let hour = currentDate.getHours();
    if (hour > 16) {
        return "<p>Good evening!</p> " + name;
    }
    else if (hour > 10) {
        return "<p>Good day!</p> " + name;
    }
    else {
        return "<p>Good morning!</p> " + name;
    }
}