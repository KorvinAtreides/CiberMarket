export default function clickArrow(number) {
  let arrows = document.getElementsByClassName("arrow");
  for (let arrow of arrows) {
    arrow.addEventListener("click", function () {
      if (arrow.classList.contains("arrLeft")) {
        let val = arrow.nextElementSibling.value;
        val--;
        arrow.nextElementSibling.value = String(val);
        if (Number(arrow.nextElementSibling.value) <= 0) {
          arrow.nextElementSibling.value = "1";
        }
      } else {
        let val = arrow.previousElementSibling.value;
        val++;
        if (val <= number) {
          arrow.previousElementSibling.value = String(val);
        }
      }
    });
  }
}
