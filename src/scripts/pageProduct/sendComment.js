export default function sendComment() {
  let btn = document.getElementById("sendComment");
  btn.addEventListener("click", function () {
    if (btn.previousElementSibling.value != "") {
      let name;
      if (localStorage.getItem("currentUser") != undefined) {
        name = localStorage.getItem("currentUser");
      } else {
        name = "Visitor";
      } // for not authorized guests
      document.getElementById("areacomments").innerHTML += `
                  <div id="comments">
                      <div id="who">${name}:</div>
                      <div id="what">${btn.previousElementSibling.value}</div>
                  </div>`;
    }
  });
}
