import User from "../constructor/user.js";
import inputsValidity from "../loadPages/inputsValidity";
import getRequest from "../server/getRequest.js";
import postRequest from "../server/postRequest.js";

export default function signUp() {
  btnForReg.addEventListener("click", function () {
    inputsValidity();
    if (loginReg.value != "" && passwordReg.value != "") {
      let request = getRequest("users");
      if (request.status == 200) {
        let responseObj = JSON.parse(request.object);
        let login = document.getElementById("loginReg").value;
        let pass = document.getElementById("passwordReg").value;
        let i = 0;
        for (let j = 0; j < responseObj.length; j++) {
          if (responseObj[j].user.name == login) {
            i++;
          }
        }
        if (i != 0) {
          alert("there is an account with this login");
        } else {
          let user = new User(login, pass);
          let data = [];
          data[0] = { id: `${responseObj.length + 1}`, user: user };
          postRequest("users", JSON.stringify(data[0]));
          alert(`thanks for registration, ${login}`);
          let currentUser = login;
          localStorage.setItem("currentUser", currentUser);
          document.location.href = "./index.html";
        }
      } else if (request.status == 404) {
        console.log("Ресурс не найден");
      } else {
        console.log(String(request.status));
      }
    }
  });
}
