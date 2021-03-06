export default function stars() {
  let stars = document.getElementsByClassName("star");
  for (let star of stars) {
    star.addEventListener("click", function () {
      let i = 1;
      star.innerHTML = "";
      star.innerHTML = `<i class="fas fa-star"></i>`;
      let star2 = star;
      let star3 = star;
      while (star3.previousElementSibling !== null && i < 5) {
        star3.previousElementSibling.innerHTML = "";
        star3.previousElementSibling.innerHTML = `<i class="fas fa-star"></i>`;
        star3 = star3.previousElementSibling;
        i++; //to avoid unlimited cycling in the case of any mistake
      }
      while (star2.nextElementSibling !== null && i < 5) {
        star2.nextElementSibling.innerHTML = "";
        star2.nextElementSibling.innerHTML = `<i class="far fa-star"></i>`;
        star2 = star2.nextElementSibling;
        i++;
      }
    });
  }
}
