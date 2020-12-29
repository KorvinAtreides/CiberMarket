import initializeClock from "./clockSales/clocker.js";

if (document.getElementById("catalog") !== null) {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/goods", false);
  request.send();
  var status = request.status;
  if (status == 200) {
    let responseObj = new Map(JSON.parse(request.response));
    let ul = document.getElementById("catalog");
    let mapGoods;
    if (localStorage.getItem("goodsInBranch") != undefined) {
      mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
      for (let [key, value] of mapGoods) {
        //сопосталение количества и айди элементов в localStorage
        let id = String(key).slice(9); //и информации на сервере
        let li = document.createElement("li"); //отрисовка
        ul.appendChild(li);
        li.innerHTML = `<img src="${responseObj.get(id).src}.png"</img>
                <div>
                    <h3>${responseObj.get(String(id)).name}</h3>
                    <div class="counter">
                        <input type="text" value="${value}" pattern="^[ 0-9]+$" disabled="disabled"></input>
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
        removeBranch(`btnBranch${responseObj.get(String(id)).id}`); //кнопка удаления из корзины
        sum(); //калькулятор
        if (responseObj.get(String(id)).sales != "No") {
          document.getElementById(
            `divSale${id}`
          ).innerHTML += `<h3>Sales!</h3><div></div>`;
          initializeClock(
            document.getElementById(`divSale${id}`),
            responseObj.get(String(id)).sales
          );
        } //распродажа
      }
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

function sum() {
  //калькулятор
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/goods", false);
  request.send();
  var status = request.status;
  if (status == 200) {
    let numberItems = 0;
    let sum = 0;
    let mapGoods;
    let responseObj = new Map(JSON.parse(request.response));
    if (localStorage.getItem("goodsInBranch") != undefined) {
      mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
      for (let [key, value] of mapGoods) {
        let id = String(key).slice(9);
        numberItems += value; //считаем количество элементов
        sum += value * responseObj.get(id).price; //и их сумму
      }
      document.getElementById(
        "sum"
      ).innerHTML = `There are ${numberItems} items in your branch on sum of ${
        Math.round(sum * 100) / 100
      }$`;
    } //если ничего нет
    else {
      document.getElementById(
        "sum"
      ).innerHTML = `There are 0 items in your branch on sum of 0$`;
    }
  } else if (status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(request.statusText);
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
    sum(); //пересчитываем калькулятор
    if (ul.innerHTML == "") {
      ul.innerHTML = `<div>
                <h3>Sorry, the branch is empty</h3>
                <h3>Please, add something in it</h3>
            </div>`; //если ничего не осталось
    }
  });
}
if (document.getElementsByTagName("input") !== null) {
  var inpyts = document.getElementsByTagName("input");
  inpytVal();
}
function inpytVal() {
  //проверка валидности
  for (let inpyt of inpyts) {
    inpyt.addEventListener("change", function (event) {
      if (inpyt.validity.valid == false) {
        if (inpyt.parentElement.id == "PriceSel") {
          inpyt.value = "0";
        } else if (inpyt.parentElement.parentElement.id == "menuUl") {
          inpyt.value = "";
        } else {
          inpyt.value = "1";
        }
        alert("неверное значение");
      }
    });
  }
}

function branchLabel() {
  //перезапись отображения колва элементов в корзине, в хедере
  let numberItems = 0;
  let mapGoods;
  if (localStorage.getItem("goodsInBranch") != undefined) {
    mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
    for (let [key, value] of mapGoods) {
      numberItems += value;
    }
    document.getElementById("numberItems").value = numberItems;
  } else {
    document.getElementById("numberItems").value = 0;
  }
}
