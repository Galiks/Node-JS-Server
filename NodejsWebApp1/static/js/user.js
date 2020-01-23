function resetForm() {
    var form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}

var row = function (user) {
    return "<tr data-rowid='" + user.id + "'><td>" + user.id + "</td>" +
        "<td>" + user.firstName + "</td> " +
        "<td> " + user.lastName + "</td> " +
        "<td> " + user.email + "</td> " +
        "<td> " + user.password + "</td> " +
        "<td> " + user.phone + "</td> " +
        "<td><a class='editLink' data-id='" + user.id + "'>Изменить</a> | " +
        "<a class='removeLink' data-id='" + user.id + "'>Удалить</a></td></tr>";
}

function getUsers() {
    $.ajax({
        url: "/api/users",
        type: "GET",
        contentType: "appliction/json",
        success: function (users) {
            var rows = "";
            $.each(users, function (index, user) {
                rows += row(user);
            });
            var table = $("table tbody");
            console.log(table);
            tble.append(rows);
        }
    })
}

function getUserById(id) {
    $.ajax({
        url: "/api/users/" + id,
        type: "GET",
        contentType: "application/json",
        success: function (user) {
            var form = document.forms["userForm"];
            form.elements["id"].value = user.id;
            form.elements["firstName"].value = user.firstName;
            form.elements["lastName"].value = user.lastName;
            form.elements["email"].value = user.email;
            form.elements["password"].value = user.password;
            form.elements["phone"].value = user.phone;
        }
    })
}

function creteUser(firstName, lastName, email, password, phone) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone
        }),
        success: function (user) {
            resetForm();
            $("#data").append(row(user))
        }
    })
}

function editUser(id, firstName, lastName, email, password, phone) {
    $.ajax({
        url: "api/users/" + id,
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone
        }),
        success: function (user) {
            resetForm();
            $("tr[data-rowid='" + user.id + "'").replaceWith(row(user));
        }
    })
}

function deleteUser(id) {
    $.ajax({
        url: "api/users/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: function (user) {
            console.log("remove user: " + user);
            $("tr[data-rowid='" + user.id + "']").remove();
        }
    })
}