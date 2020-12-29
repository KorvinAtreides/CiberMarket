import initializeClock from "./clockSales/clocker.js";

if (document.getElementById("catalog") !== null) {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/goods", false);
  request.send();
  var status = request.status;
  if (status == 200) {
    let responseObj = new Map(JSON.parse(request.response));
    for (let i = 0; i < responseObj.size; i += 4) {
      //загрузка каталога
      let li = document.createElement("li"); //с наугад выбранными элементами
      let ul = document.getElementById("catalog");
      ul.appendChild(li);
      li.innerHTML = `<img src="${responseObj.get(String(i + 1)).src}.png"</img>
            <div>
                <h3>${responseObj.get(String(i + 1)).name}</h3>
                <div class="counter">
                    <span class="arrow arrLeft" id="arrLeft${
                      i + 1
                    }"><i class="fas fa-chevron-left"></i></span>
                    <input type="text" value="1" pattern="^[ 0-9]+$" required></input>
                    <span class="arrow arrRight" id="arrRight${
                      i + 1
                    }"> <i class="fas fa-chevron-right"></i></span>
                </div>
                <h3>Price per one item: ${
                  responseObj.get(String(i + 1)).price
                }$</h3>
                <h3>Made in ${responseObj.get(String(i + 1)).country}</h3>
                <div class="btnBranch" id="btnBranch${
                  responseObj.get(String(i + 1)).id
                }">
                <h3>Add into Branch</h3>
                </div>
                <div class="divSale" id="divSale${i + 1}">
                </div>
            </div>`;
      inpytVal();
      addBranch1(`btnBranch${responseObj.get(String(i + 1)).id}`);
      if (responseObj.get(String(i + 1)).sales != "No") {
        document.getElementById(
          `divSale${i + 1}`
        ).innerHTML += `<h3>Sales!</h3><div></div>`;
        initializeClock(
          document.getElementById(`divSale${i + 1}`),
          responseObj.get(String(i + 1)).sales
        );
      }
    }
    clickArrow1();
  } else if (status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(request.statusText);
  }
}

if (document.getElementById("confirm") !== null) {
  document.getElementById("confirm").addEventListener("click", function () {
    let l = 0;
    let k = 0;
    let checks = document.getElementsByClassName("checkCategory");
    for (check of checks) {
      if (check.checked == true) {
        l++;
      }
    }
    let checks2 = document.getElementsByClassName("checkCountry");
    for (check of checks2) {
      if (check.checked == true) {
        k++;
      }
    } //проверка на валидность
    let priceMina = +document.getElementById("PriceSel").children[0].value;
    let priceMaxa = +document.getElementById("PriceSel").children[1].value;
    if (l == 0 || k == 0) {
      alert("You have to choose at least one category and one country");
    } else if (priceMina >= priceMaxa) {
      alert("You have to choose price filter correctly");
    } else {
      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:3000/goods", false);
      request.send();
      var status = request.status;
      if (status == 200) {
        let responseObj = new Map(JSON.parse(request.response));
        let ul = document.getElementById("catalog");
        ul.innerHTML = "";
        for (let i = 0; i < responseObj.size; i++) {
          let li = document.createElement("li");
          let category = responseObj.get(String(i + 1)).category;
          let priceMin = +document.getElementById("PriceSel").children[0].value;
          let priceMax = +document.getElementById("PriceSel").children[1].value;
          let country = responseObj.get(String(i + 1)).country;
          if (
            document.getElementById(String(category)).checked == true && //проверка на категорию
            Number(responseObj.get(String(i + 1)).price) <= priceMax && //и на ценоввой фильтр
            Number(responseObj.get(String(i + 1)).price) >= priceMin && //и на страны
            document.getElementById(String(country)).checked == true && //включён фильтр распродаж и элемент на распродаже
            ((responseObj.get(String(i + 1)).sales != "No" &&
              document.getElementById("Sales").checked == true) ||
              document.getElementById("Sales").checked == false)
          ) {
            //или фильтр выключен
            ul.appendChild(li);
            li.innerHTML = `<img src="${
              responseObj.get(String(i + 1)).src
            }.png"</img>
                        <div>
                            <h3>${responseObj.get(String(i + 1)).name}</h3>
                            <div class="counter">
                                <span class="arrow arrLeft" id="arrLeft${
                                  i + 1
                                }"><i class="fas fa-chevron-left"></i></span>
                                <input type="text" value="1" pattern="^[ 0-9]+$" required></input>
                                <span class="arrow arrRight" id="arrRight${
                                  i + 1
                                }"> <i class="fas fa-chevron-right"></i></span>
                            </div>
                            <h3>Price per one item: ${
                              responseObj.get(String(i + 1)).price
                            }$</h3>
                            <h3>Made in ${
                              responseObj.get(String(i + 1)).country
                            }</h3>
                            <div class="btnBranch" id="btnBranch${
                              responseObj.get(String(i + 1)).id
                            }">
                            <h3>Add into Branch</h3>
                            </div>
                            <div class="divSale" id="divSale${i + 1}">
                            </div>
                        </div>`;
            inpytVal();
            addBranch1(`btnBranch${responseObj.get(String(i + 1)).id}`);
            if (responseObj.get(String(i + 1)).sales != "No") {
              document.getElementById(
                `divSale${i + 1}`
              ).innerHTML += `<h3>Sales!</h3><div></div>`;
              initializeClock(
                document.getElementById(`divSale${i + 1}`),
                responseObj.get(String(i + 1)).sales
              );
            }
          }
        }
        if (ul.innerHTML == "") {
          ul.innerHTML = `<div>
                        <h3>Sorry, we couldn't found anything</h3>
                        <h3>Please, make another try</h3>
                    </div>`;
        }
        clickArrow1();
      } else if (status == 404) {
        console.log("Ресурс не найден");
      } else {
        console.log(request.statusText);
      }
    }
  });
}
//запуск поиска в каталоге по запросу
if (
  document.getElementById("catalog") !== null &&
  localStorage.getItem("searchItem") !== null
) {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/goods", false);
  request.send();
  var status = request.status;
  if (status == 200) {
    let responseObj = new Map(JSON.parse(request.response));
    let ul = document.getElementById("catalog");
    ul.innerHTML = "";
    let search = localStorage.getItem("searchItem");
    localStorage.removeItem("searchItem");
    for (let [key, value] of responseObj) {
      //если есть совпадение - отрисовка
      if (value.name.indexOf(String(search)) != -1) {
        let li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = `<img src="${value.src}.png"</img>
                <div>
                <h3>${value.name}</h3>
                    <div class="counter">
                        <span class="arrow arrLeft" id="arrLeft${value.id}"><i class="fas fa-chevron-left"></i></span>
                        <input type="text" value="1" pattern="^[ 0-9]+$" required></input>
                        <span class="arrow arrRight" id="arrRight${value.id}"> <i class="fas fa-chevron-right"></i></span>
                    </div>
                    <h3>Price per one item: ${value.price}$</h3>
                    <h3>Made in ${value.country}</h3>
                    <div class="btnBranch" id="btnBranch${value.id}">
                        <h3>Add into Branch</h3>
                    </div>
                    <div class="divSale" id="divSale${value.id}">
                    </div>
                </div>`;
        addBranch1(`btnBranch${value.id}`);
        if (value.sales != "No") {
          document.getElementById(
            `divSale${value.id}`
          ).innerHTML += `<h3>Sales!</h3><div></div>`;
          initializeClock(
            document.getElementById(`divSale${value.id}`),
            value.sales
          );
        }
      }
    }
    if (ul.innerHTML == "") {
      //если ничего не найдено
      ul.innerHTML = `<div>
                <h3>Sorry, we couldn't found anything</h3>
                <h3>Please, make another try</h3>
            </div>`;
    } else {
      //если есть что-то то вызываются листенеры на стрелочки
      inpytVal();
      clickArrow1();
    } //и проверка на валидность
  } else if (status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(request.statusText);
  }
}

function clickArrow1() {
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
        let val = arrow.previousElementSibling.value; //увеличивают на 1
        val++;
        arrow.previousElementSibling.value = String(val);
      }
    });
  }
}
function addBranch1(id) {
  //кнопка хранит айди элемента на добааление
  let elem = document.getElementById(String(id));
  elem.addEventListener("click", function () {
    // кол-во объектов на заказ
    let number =
      elem.previousElementSibling.previousElementSibling.previousElementSibling
        .children[1].value;
    let mapGoods;
    if (localStorage.getItem("goodsInBranch") != undefined) {
      //считываение корзины
      mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
    } else {
      mapGoods = new Map();
    }
    if (mapGoods.get(String(id)) != undefined) {
      //если есть этот элемент
      let was = mapGoods.get(String(id));
      mapGoods.delete(String(id));
      mapGoods.set(String(id), Number(was) + Number(number)); //то плюсуем
    } else {
      mapGoods.set(String(id), Number(number));
    } // иначе просто записываем
    localStorage.setItem("goodsInBranch", JSON.stringify([...mapGoods]));
    branchLabel();
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
