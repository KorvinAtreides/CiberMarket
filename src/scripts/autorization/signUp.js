import User from "../constructor/user.js";
import inputsValidity from "../loadPages/inputsValidity";

export default function signUp() {
  btnForReg.addEventListener("click", function () {
    inputsValidity();
    if (loginReg.value != "" && passwordReg.value != "") {
      let request = new XMLHttpRequest();
      request.open("GET", "http://localhost:3000/users", false);
      request.send();
      let status = request.status;
      if (status == 200) {
        let responseObj = JSON.parse(request.response);
        let login = document.getElementById("loginReg").value;
        let pass = document.getElementById("passwordReg").value;
        let i = 0;
        for (let j = 0; j < responseObj.length; j++) {
          if (responseObj[j].user.name == login) {
            i++;
          }
        } // если нашёл юзера с таким же логином - алерт
        if (i != 0) {
          alert("there is an account with this login");
        } else {
          let user = new User(login, pass);
          let data = [];
          data[0] = { id: `${responseObj.length + 1}`, user: user };
          fetch("http://localhost:3000/users", {
            method: "post",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data[0]),
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
