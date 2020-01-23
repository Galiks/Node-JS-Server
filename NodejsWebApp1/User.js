function User(idUser, firstName, lastName, email, password, phone) {

    this.idUser = idUser;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
}

User.prototype.displayInfo = function () {
    return "<h1>Full name: " + this.firstName + " " + this.lastName + "</h1>";
}

module.exports = User;