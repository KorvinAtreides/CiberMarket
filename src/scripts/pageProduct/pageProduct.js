import initializeClock from "../clockSales/clocker.js";
import stars from "./stars.js";
import addBranch from "./addBranch";
import clickArrow from "./clickArrow";
import getRequest from "../server/getRequest.js";

export default function pageProduct() {
  let request = getRequest("goods");
  if (request.status == 200) {
    let name = localStorage.getItem("currentItem");
    let responseObj = new Map(JSON.parse(request.object));
    for (let [key, value] of responseObj) {
      if (value.name == name) {
        //вся инфа по найденному элементу
        document.getElementById("flexProd").innerHTML = `
            <div class="image">
                <img src="${value.src}.png"></img>
            </div>
            <div class="content">
                <h3>${name}</h3>
                <h3>Price per one item: ${value.price}$</h3>
                <div class="counter">
                    <span class="arrow arrLeft" id="arrLeft"><i class="fas fa-chevron-left"></i></span>
                    <input type="text" value="1" pattern="^[ 0-9]+$" required></input>
                    <span class="arrow arrRight" id="arrRight$"> <i class="fas fa-chevron-right"></i></span>
                    <h3>${value.number} pieces available</h3>
                </div>
                <h3>Made in ${value.country}</h3>
                <div id="divStars">
                    <span class="star"><i class="far fa-star"></i></span>
                    <span class="star"><i class="far fa-star"></i></span>
                    <span class="star"><i class="far fa-star"></i></span>
                    <span class="star"><i class="far fa-star"></i></span>
                    <span class="star"><i class="far fa-star"></i></span>
                </div>
                <div class="btnBranch" id="btnBranch${value.id}">
                    <h3>Add into Branch</h3>
                </div>
                <div class="divSale" id="divSale${value.id}">
                </div>
            </div>`;
        clickArrow(value.number);
        stars();
        addBranch(`btnBranch${value.id}`, value.number); //кнопка добавки в корзину
        if (value.sales != "No") {
          //проверка статуса распродажи
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
  } else if (request.status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(String(request.status));
  }
}
