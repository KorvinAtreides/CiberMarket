export default function signIn() {
  btnForLogin.addEventListener("click", function () {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/users", false);
    request.send();
    let status = request.status;
    if (status == 200) {
      let responseObj = JSON.parse(request.response);
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
    } else if (status == 404) {
      console.log("Ресурс не найден");
    } else {
      console.log(request.statusText);
    }
  });
}
