export default function signIn() {
  btnForLogin.addEventListener("click", function () {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/users", false);
    request.send();
    let status = request.status;
    if (status == 200) {
      let responseObj = new Map(JSON.parse(request.response)); //запрос на сервер
      let i = 0;
      for (let [key, value] of responseObj) {
        if (value.name == login.value && value.pass == password.value) {
          i++; //простейшая проверка на правильность
          alert(`Hello, ${value.name},welcome to your account`);
          let currentUser = value.name;
          localStorage.setItem("currentUser", currentUser);
          document.location.href = "./index.html";
        }
      }
      if (i == 0) {
        alert("Not correct login or password");
        document.getElementById("password").value = "";
      }
    } else if (status == 404) {
      console.log("Ресурс не найден");
    } else {
      console.log(request.statusText);
    }
  });
}
