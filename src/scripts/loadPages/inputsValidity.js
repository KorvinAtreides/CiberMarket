export default function inputsValidity() {
  if (document.getElementsByTagName("input") !== null) {
    let inpyts = document.getElementsByTagName("input");
    for (let inpyt of inpyts) {
      inpyt.addEventListener("change", function (event) {
        if (inpyt.validity.valid == false) {
          if (inpyt.parentElement.id == "PriceSel") {
            inpyt.value = "0";
          } else if (inpyt.parentElement.className == "counter") {
            inpyt.value = "1";
          } else {
            inpyt.value = "";
          }
          alert("неверное значение");
        }
      });
    }
  }
}
