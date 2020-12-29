export default function loadUser() {
  if (document.getElementById("menuUl") !== null) {
    //проверка есть ли в системе пользователь
    if (localStorage.getItem("currentUser") != undefined) {
      let len = menuUl.children.length;
      menuUl.children[len - 1].innerHTML = `
        Hello, ${localStorage.getItem(
          "currentUser"
        )}!<br><a href="./PersonalCabinet.html">Personal Cabinet</a> <br> <a id="logOut">LogOut</a></li>`;
      logOut.addEventListener("click", function () {
        localStorage.removeItem("currentUser"); //обнуление корзины и юзера
        localStorage.removeItem("goodsInBranch");
        numberItems.value = 0;
        menuUl.children[len - 1].innerHTML = `
                Hello, visitor! <br> <a href="./login.html">SignIn </a>or <a href="./register.html">SignUp</a></li>`;
      });
    }
  }
}
