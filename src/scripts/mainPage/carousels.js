export default function carousels() {
  let len = carysel1.children.length;
  caryselDiv1.innerHTML += `<div id="circles"></div>`;
  for (let i = 0; i < len; i++) {
    circles.innerHTML += `<span class="spanCircle" id="spanCircle${i}"><i class="fas fa-circle"></i></span>`;
  }
  for (let circle of circles.children) {
    circle.addEventListener("click", function () {
      let k;
      for (let i = 0; i < len; i++) {
        if (carysel1.children[i].classList.contains("active")) {
          k = i;
        }
      }
      carysel1.children[k].classList.remove("active");
      carysel1.children[k].classList.add("notActive");
      let str = circle.id.slice(-1); //which el will be active
      carysel1.children[str].classList.remove("notActive");
      carysel1.children[str].classList.add("active");
    });
  }
  let arrows = document.getElementsByClassName("arrow");
  for (let arrow of arrows) {
    arrow.addEventListener("click", function () {
      let k;
      for (let i = 0; i < len; i++) {
        if (carysel1.children[i].classList.contains("active")) {
          k = i; //which el was active
        }
      }
      if (arrow.id == "arrLeft") {
        if (k == 0) {
          //if first, then last will be active
          carysel1.children[k].classList.remove("active");
          carysel1.children[k].classList.add("notActive");
          carysel1.children[len - 1].classList.remove("notActive");
          carysel1.children[len - 1].classList.add("active");
        } else {
          //previous will be active
          carysel1.children[k].classList.remove("active");
          carysel1.children[k].classList.add("notActive");
          carysel1.children[k - 1].classList.remove("notActive");
          carysel1.children[k - 1].classList.add("active");
        }
      }
      if (arrow.id == "arrRight") {
        if (k == len - 1) {
          //if last, then first will be active
          carysel1.children[k].classList.remove("active");
          carysel1.children[k].classList.add("notActive");
          carysel1.children[0].classList.remove("notActive");
          carysel1.children[0].classList.add("active");
        } else {
          //next will be active
          carysel1.children[k].classList.remove("active");
          carysel1.children[k].classList.add("notActive");
          carysel1.children[k + 1].classList.remove("notActive");
          carysel1.children[k + 1].classList.add("active");
        }
      }
      if (arrow.id == "arrLeft2") {
        //second carysel, left arrow
        k = 3;
        let arr = [];
        let len2 = carysel2.children.length;
        for (let i = len2 - 1; i >= 0; i--) {
          if (carysel2.children[i].classList.contains("active")) {
            arr[k] = i; //what el-s are active
            k--;
          }
        }
        if (arr[0] == 0) {
          //first active el is first in ul
          carysel2.children[3].classList.remove("active");
          carysel2.children[3].classList.add("notActive");
          let li = carysel2.children[len2 - 1];
          li.classList.remove("notActive");
          li.classList.add("active"); //last become active
          carysel2.removeChild(li);
          carysel2.prepend(li);
        } else {
          //go left
          carysel2.children[arr[3]].classList.remove("active");
          carysel2.children[arr[3]].classList.add("notActive");
          carysel2.children[arr[0] - 1].classList.remove("notActive");
          carysel2.children[arr[0] - 1].classList.add("active");
        }
      }
      if (arrow.id == "arrRight2") {
        k = 0;
        let arr = [];
        let len2 = carysel2.children.length;
        for (let i = 0; i < len2; i++) {
          if (carysel2.children[i].classList.contains("active")) {
            arr[k] = i;
            k++;
          }
        }
        if (arr[3] == len2 - 1) {
          //last active element is last in ul
          carysel2.children[len2 - 4].classList.remove("active");
          carysel2.children[len2 - 4].classList.add("notActive");
          let li = carysel2.children[0];
          li.classList.remove("notActive"); //first is active
          li.classList.add("active");
          carysel2.removeChild(li);
          carysel2.appendChild(li);
        } else {
          //go right
          carysel2.children[arr[0]].classList.remove("active");
          carysel2.children[arr[0]].classList.add("notActive");
          carysel2.children[arr[3] + 1].classList.remove("notActive");
          carysel2.children[arr[3] + 1].classList.add("active");
        }
      }
    });
  }
}
