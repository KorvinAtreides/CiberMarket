export default function clickArrow1() {
  let arrows = document.getElementsByClassName("arrow");
  for (let arrow of arrows) {
    arrow.onclick = function () {
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
    };
  }
}
