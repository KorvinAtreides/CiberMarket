import initializeClock from "./clockSales/clocker.js";

if (document.getElementById("branchUl") !== null) {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/goods", false);
  request.send();
  var status = request.status;
  if (status == 200) {
    let responseObj = new Map(JSON.parse(request.response));
    let ul = document.getElementById("branchUl");
    let mapGoods;
    if (localStorage.getItem("goodsInBranch") != undefined) {
      mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
      for (let [key, value] of mapGoods) {
        //сопосталение количества и айди элементов в localStorage
        let id = String(key).slice(9); //и информации на сервере
        let li = document.createElement("li");
        ul.appendChild(li); //отрисовка
        li.innerHTML = `<img src="${responseObj.get(id).src}.png"</img>
                <div>
                    <h3>${responseObj.get(String(id)).name}</h3>
                    <div class="counter">
                        <span class="arrow arrLeft" id="arrLeft${id}"><i class="fas fa-chevron-left"></i></span>
                        <input type="text" value="${value}" pattern="^[ 0-9]+$" required></input>
                        <span class="arrow arrRight" id="arrRight${id}"> <i class="fas fa-chevron-right"></i></span>
                    </div>
                    <h3>Price per one item: ${responseObj.get(id).price}$</h3>
                    <h3>Made in ${responseObj.get(String(id)).country}</h3>
                    <div class="btnBranch" id="btnBranch${
                      responseObj.get(String(id)).id
                    }">
                    <h3>Remove from Branch</h3>
                    </div>
                    <div class="divSale" id="divSale${id}">
                    </div>
                </div>`;
        inpytVal();
        removeBranch(`btnBranch${responseObj.get(String(id)).id}`); //кнопка удаления из корзины
        if (responseObj.get(String(id)).sales != "No") {
          document.getElementById(
            `divSale${id}`
          ).innerHTML += `<h3>Sales!</h3><div></div>`;
          initializeClock(
            document.getElementById(`divSale${id}`),
            responseObj.get(String(id)).sales
          );
        }
      } //распродажа
      clickArrow();
    }
    if (ul.innerHTML == "") {
      ul.innerHTML = `<div>
                <h3>Sorry, the branch is empty</h3>
                <h3>Please, add something in it</h3>
            </div>`; //если ничего нет
    }
  } else if (status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(request.statusText);
  }
}

function clickArrow() {
  //стрелки
  let arrows = document.getElementsByClassName("arrow");
  for (let arrow of arrows) {
    arrow.addEventListener("click", function () {
      if (arrow.classList.contains("arrLeft")) {
        let val = arrow.nextElementSibling.value;
        val--;
        arrow.nextElementSibling.value = String(val); // уменьшают значение на 1
        if (Number(arrow.nextElementSibling.value) <= 0) {
          arrow.nextElementSibling.value = "1"; //но не менбше 0
        }
      } else {
        let val = arrow.previousElementSibling.value;
        val++;
        arrow.previousElementSibling.value = String(val); //увеличивают на 1
      }
      let id = String(
        arrow.parentElement.nextElementSibling.nextElementSibling
          .nextElementSibling.id
      );
      let number = arrow.parentElement.children[1].value;
      let mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
      mapGoods.delete(String(id)); //перезапись элементов в корзине
      mapGoods.set(String(id), Number(number));
      localStorage.setItem("goodsInBranch", JSON.stringify([...mapGoods]));
      branchLabel();
    });
  }
}
function removeBranch(id) {
  //кнопка хранит айди элемента на убирание
  let elem = document.getElementById(String(id));
  elem.addEventListener("click", function () {
    mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
    mapGoods.delete(String(id)); //всё стирается
    localStorage.setItem("goodsInBranch", JSON.stringify([...mapGoods]));
    branchLabel();
    elem.parentElement.parentElement.remove();
    event.stopPropagation();
    let ul = document.getElementById("branchUl");
    if (ul.innerHTML == "") {
      ul.innerHTML = `<div>
                <h3>Sorry, the branch is empty</h3>
                <h3>Please, add something in it</h3>
            </div>`; //если ничего не осталось
    }
  });
}
