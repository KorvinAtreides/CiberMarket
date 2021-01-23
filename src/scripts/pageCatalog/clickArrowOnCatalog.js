export default function clickArrowOnCatalog() {
  let catalog = document.getElementById("catalog");
  catalog.addEventListener("click", function (event) {
    let arrow;
    if (event.target.parentNode.classList.contains("arrow")) {
      arrow = event.target.parentNode;
    } else if (event.target.parentNode.parentNode.classList.contains("arrow")) {
      arrow = event.target.parentNode.parentNode;
    }
    if (arrow != undefined) {
      if (arrow.classList.contains("arrLeft")) {
        let val = arrow.nextElementSibling.value;
        val--;
        arrow.nextElementSibling.value = String(val); // уменьшают значение на 1
        if (Number(arrow.nextElementSibling.value) <= 0) {
          arrow.nextElementSibling.value = "1"; //но не менбше 0
        }
      } else {
        let val = arrow.previousElementSibling.value; //увеличивают на 1
        val++;
        arrow.previousElementSibling.value = String(val);
      }
    }
  });
}
