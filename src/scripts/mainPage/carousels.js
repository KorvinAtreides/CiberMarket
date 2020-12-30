export default function carousels() {
  let len = carysel1.children.length;
  caryselDiv1.innerHTML += `<div id="circles"></div>`;
  for (let i = 0; i < len; i++) {
    //запись кружков для отображения
    circles.innerHTML += `<span id="spanCircle${i}"><i class="fas fa-circle"></i></span>`;
  }
  for (let circle of circles.children) {
    circle.addEventListener("click", function () {
      //кликер
      let k;
      for (let i = 0; i < len; i++) {
        if (carysel1.children[i].classList.contains("active")) {
          k = i; //какой эл был активен
        }
      }
      carysel1.children[k].classList.remove("active");
      carysel1.children[k].classList.add("notActive");
      let str = circle.id.slice(-1); //какой эл будет активен
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
          k = i; //какой эл был активен
        }
      }
      if (arrow.id == "arrLeft") {
        //левая стрелка
        if (k == 0) {
          //если нулевой, то последний актиен
          carysel1.children[k].classList.remove("active");
          carysel1.children[k].classList.add("notActive");
          carysel1.children[len - 1].classList.remove("notActive");
          carysel1.children[len - 1].classList.add("active");
        } else {
          //иначе предыдущий
          carysel1.children[k].classList.remove("active");
          carysel1.children[k].classList.add("notActive");
          carysel1.children[k - 1].classList.remove("notActive");
          carysel1.children[k - 1].classList.add("active");
        }
      }
      if (arrow.id == "arrRight") {
        //правая стрелка
        if (k == len - 1) {
          //если последний, то первый актиен
          carysel1.children[k].classList.remove("active");
          carysel1.children[k].classList.add("notActive");
          carysel1.children[0].classList.remove("notActive");
          carysel1.children[0].classList.add("active");
        } else {
          //иначе следующий
          carysel1.children[k].classList.remove("active");
          carysel1.children[k].classList.add("notActive");
          carysel1.children[k + 1].classList.remove("notActive");
          carysel1.children[k + 1].classList.add("active");
        }
      }
      if (arrow.id == "arrLeft2") {
        //если вторая карусель и левая стрелка
        k = 3;
        let arr = [];
        let len2 = carysel2.children.length;
        for (let i = len2 - 1; i >= 0; i--) {
          if (carysel2.children[i].classList.contains("active")) {
            arr[k] = i; //какие элементы активны
            k--;
          }
        }
        if (arr[0] == 0) {
          //если первый элемент среди активных находится в начале
          carysel2.children[3].classList.remove("active");
          carysel2.children[3].classList.add("notActive");
          let li = carysel2.children[len2 - 1];
          li.classList.remove("notActive");
          li.classList.add("active"); //последний актиен и достраивается вперёд
          carysel2.removeChild(li);
          carysel2.prepend(li);
        } else {
          //иначе смещается влево
          carysel2.children[arr[3]].classList.remove("active");
          carysel2.children[arr[3]].classList.add("notActive");
          carysel2.children[arr[0] - 1].classList.remove("notActive");
          carysel2.children[arr[0] - 1].classList.add("active");
        }
      }
      if (arrow.id == "arrRight2") {
        //если вторая карусель и правая стрелка
        k = 0;
        let arr = [];
        let len2 = carysel2.children.length;
        for (let i = 0; i < len2; i++) {
          if (carysel2.children[i].classList.contains("active")) {
            arr[k] = i; //какие элементы активны
            k++;
          }
        }
        if (arr[3] == len2 - 1) {
          //если последний элемент среди активных находится в конце
          carysel2.children[len2 - 4].classList.remove("active");
          carysel2.children[len2 - 4].classList.add("notActive");
          let li = carysel2.children[0];
          li.classList.remove("notActive"); //первый активен и достраивается назад
          li.classList.add("active");
          carysel2.removeChild(li);
          carysel2.appendChild(li);
        } else {
          //иначе смещается вправо
          carysel2.children[arr[0]].classList.remove("active");
          carysel2.children[arr[0]].classList.add("notActive");
          carysel2.children[arr[3] + 1].classList.remove("notActive");
          carysel2.children[arr[3] + 1].classList.add("active");
        }
      }
    });
  }
}
