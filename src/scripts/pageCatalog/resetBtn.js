export default function resetBtn() {
  resetBtn.addEventListener("click", function () {
    AllCategory.checked = true;
    let checks = document.getElementsByClassName("checkCategory");
    for (check of checks) {
      check.checked = true;
      check.setAttribute("disabled", "disabled");
    }
    document.getElementById("Allcountry").checked = true;
    let checks2 = document.getElementsByClassName("checkCountry");
    for (check of checks2) {
      check.checked = true;
    }
    document.getElementById("Sales").checked = true;
    document.getElementById("PriceSel").children[0].value = 0;
    document.getElementById("PriceSel").children[1].value = 4999.9;
  });
}
