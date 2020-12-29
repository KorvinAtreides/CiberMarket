import User from "../constructor/user.js";
import inputsValidity from "../loadPages/inputsValidity";

if (document.getElementById("btnForReg") !== null) {
  btnForReg.addEventListener("click", function () {
    inputsValidity();
    if (loginReg.value != "" && passwordReg.value != "") {
      let request = new XMLHttpRequest();
      request.open("GET", "http://localhost:3000/users", false);
      request.send();
      let status = request.status;
      if (status == 200) {
        let responseObj = new Map(JSON.parse(request.response));
        let login = document.getElementById("loginReg").value;
        let pass = document.getElementById("passwordReg").value;
        let i = 0;
        for (let [key, value] of responseObj) {
          if (value.name == login) {
            i++;
          }
        } // если нашёл юзера с таким же логином - алерт
        if (i != 0) {
          alert("there is an account with this login");
        } else {
          let user = new User(login, pass);
          let userMap = new Map();
          userMap.set(`${responseObj.size + 1}`, user);
          //  JSON.stringify плохо переносит Map, этот фокус позволяет
          // преобразовать Map в JSON, но там образуются лишние скобки []
          //  json-server их считает лишними и отказыается делать post
          // slice их убирает
          //  с localStorage таких проблем нет, записывается и считывается без слайса
          let rfgf = String(JSON.stringify([...userMap]));
          fetch("http://localhost:3000/users", {
            method: "post",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: rfgf.slice(1, -1),
          });
          alert(`thanks for registration, ${login}`);
          let currentUser = login;
          localStorage.setItem("currentUser", currentUser); //запоминаем, кто в сети
          document.location.href = "./index.html";
        }
      } else if (status == 404) {
        console.log("Ресурс не найден");
      } else {
        console.log(request.statusText);
      }
    }
  });
}
