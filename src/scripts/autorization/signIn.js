import getRequest from "../server/getRequest";

export default function signIn() {
  btnForLogin.addEventListener("click", function () {
    let request = getRequest("users");
    if (request.status == 200) {
      let responseObj = JSON.parse(request.object);
      let i = 0;
      for (let j = 0; j < responseObj.length; j++) {
        let checkUser = responseObj[j].user;
        if (checkUser.name == login.value && checkUser.pass == password.value) {
          i++;
          alert(`Hello, ${checkUser.name},welcome to your account`);
          let currentUser = checkUser.name;
          localStorage.setItem("currentUser", currentUser);
          document.location.href = "./index.html";
        }
      }
      if (i == 0) {
        alert("Not correct login or password");
        document.getElementById("password").value = "";
      }
    } else if (request.status == 404) {
      console.log("Ресурс не найден");
    } else {
      console.log(String(request.status));
    }
  });
}
