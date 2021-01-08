import initializeClock from "../clockSales/clocker.js";
import clickArrow from "./counterArrows";
import inpytVal from "../loadPages/inputsValidity";
import addToBranch from "./addToBranch";
import getRequest from "../server/getRequest.js";

export default function searching() {
  if (
    document.getElementById("catalog") !== null &&
    localStorage.getItem("searchItem") !== null
  ) {
    let request = getRequest("goods");
    if (request.status == 200) {
      let responseObj = new Map(JSON.parse(request.object));
      let ul = document.getElementById("catalog");
      let search = localStorage.getItem("searchItem");
      let h3 = document.createElement("h3");
      h3.innerHTML = `Results of the query "${search}":`;
      ul.parentElement.insertBefore(h3, ul);
      ul.innerHTML = ``;
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
          addToBranch(`btnBranch${value.id}`);
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
        clickArrow();
      } //и проверка на валидность
    } else if (request.status == 404) {
      console.log("Ресурс не найден");
    } else {
      console.log(String(request.status));
    }
  }
}
