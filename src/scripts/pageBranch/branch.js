import initializeClock from "../clockSales/clocker.js";
import inputsValidity from "../loadPages/inputsValidity";
import updateBranch from "./updateBranch";
import removeFromBranch from "./removeFromBranch";
import getRequest from "../server/getRequest.js";

export default function branch() {
  let request = getRequest("goods");
  if (request.status == 200) {
    let responseObj = new Map(JSON.parse(request.object));
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
                    <div class="btn" id="btnBranch${
                      responseObj.get(String(id)).id
                    }">
                    <h3>Remove from Branch</h3>
                    </div>
                    <div class="divSale" id="divSale${id}">
                    </div>
                </div>`;
        inputsValidity();
        removeFromBranch(`btnBranch${responseObj.get(String(id)).id}`); //кнопка удаления из корзины
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
      updateBranch();
    }
    if (ul.innerHTML == "") {
      ul.innerHTML = `<div>
                <h3>Sorry, the branch is empty</h3>
                <h3>Please, add something in it</h3>
            </div>`; //если ничего нет
    }
  } else if (request.status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(String(request.status));
  }
}
