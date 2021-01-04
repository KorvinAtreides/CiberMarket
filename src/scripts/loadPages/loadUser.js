export default function loadUser() {
  if (document.getElementById("menuUl") !== null) {
    //проверка есть ли в системе пользователь
    if (localStorage.getItem("currentUser") != undefined) {
      let len = menuUl.children.length;
      menuUl.children[len - 1].innerHTML = `
        Hello, ${localStorage.getItem(
          "currentUser"
        )}!<br><a href="./personalCabinet.html">Personal Cabinet</a> <br> <a id="logOut">LogOut</a></li>`;
      logOut.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("goodsInBranch");
        document.location.reload();
      });
    }
  }
}
