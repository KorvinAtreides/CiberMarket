import addToBranch from "./addToBranch";
import inpytVal from "../loadPages/inputsValidity";
import getRequest from "../server/getRequest.js";
import toPageProduct from "../loadPages/toPageProduct.js";
import salesLabel from "../clockSales/salesLabel.js";

export default function confirmBtn() {
  document.getElementById("confirmBtn").onclick = function () {
    let l = 0;
    let k = 0;
    let checks = document.getElementsByClassName("checkCategory");
    for (let check of checks) {
      if (check.checked == true) {
        l++;
      }
    }
    let checks2 = document.getElementsByClassName("checkCountry");
    for (let check of checks2) {
      if (check.checked == true) {
        k++;
      }
    } //check validity
    let priceMina = +document.getElementById("PriceSel").children[0].value;
    let priceMaxa = +document.getElementById("PriceSel").children[1].value;
    if (l == 0 || k == 0) {
      alert("You have to choose at least one category and one country");
    } else if (priceMina >= priceMaxa) {
      alert("You have to choose price filter correctly");
    } else {
      let request = getRequest("goods");
      if (request.status == 200) {
        let responseObj = new Map(JSON.parse(request.object));
        let ul = document.getElementById("catalog");
        ul.innerHTML = "";
        for (let i = 0; i < responseObj.size; i++) {
          let li = document.createElement("li");
          let category = responseObj.get(String(i + 1)).category;
          let priceMin = +document.getElementById("PriceSel").children[0].value;
          let priceMax = +document.getElementById("PriceSel").children[1].value;
          let country = responseObj.get(String(i + 1)).country;
          if (
            document.getElementById(String(category)).checked == true && //check category
            Number(responseObj.get(String(i + 1)).price) <= priceMax && //price filter
            Number(responseObj.get(String(i + 1)).price) >= priceMin && //country filter
            document.getElementById(String(country)).checked == true && //sales filter on and el on sales
            ((responseObj.get(String(i + 1)).sales != "No" &&
              document.getElementById("Sales").checked == true) ||
              document.getElementById("Sales").checked == false)
          ) {
            //or sales filter off
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
                              <div class="btn" id="btnBranch${
                                responseObj.get(String(i + 1)).id
                              }">
                              <h3>Add into Branch</h3>
                              </div>
                              <div class="divSale" id="divSale${i + 1}">
                              </div>
                          </div>`;
            inpytVal();
            addToBranch(`btnBranch${responseObj.get(String(i + 1)).id}`);
            if (responseObj.get(String(i + 1)).sales != "No") {
              salesLabel(responseObj.get(String(i + 1)), i + 1);
            }
          }
        }
        if (ul.innerHTML == "") {
          ul.innerHTML = `<div>
                          <h3>Sorry, we couldn't found anything</h3>
                          <h3>Please, make another try</h3>
                      </div>`;
        }
        toPageProduct();
      } else if (request.status == 404) {
        console.log("Ресурс не найден");
      } else {
        console.log(String(request.status));
      }
    }
  };
}
