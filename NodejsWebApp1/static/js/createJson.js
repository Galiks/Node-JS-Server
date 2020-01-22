function createJson() {
    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault();

        let registerForm = document.forms["login"];
        let login = registerForm.elements["login"].value;
        let password = registerForm.elements["password"].value;

        let account = JSON.stringify({ email: login, password: password });

        let request = new XMLHttpRequest();
        request.open("POST", "/user", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
            let receivedUser = JSON.parse(request.response);
            console.log(receivedUser.email + " — " + receivedUser.password);
        });
        request.send(account);
    });
}