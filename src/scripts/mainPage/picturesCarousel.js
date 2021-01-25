import initializeClock from "../clockSales/clocker.js";
import getRequest from "../server/getRequest.js";

export default function picturesCarousel() {
  let request = getRequest("goods");
  if (request.status == 200) {
    let responseObj = new Map(JSON.parse(request.object));
    let len1 = carysel1.children.length;
    let first = ["23", "26", "13", "47", "37", "2", "4"];
    //ID of most beautiful/popular el for main page
    for (let i = 0; i < len1; i++) {
      carysel1.children[i].innerHTML = `<img src="${
        responseObj.get(first[i]).src
      }.png"</img>`;
    }
    let k = 0;
    let endtime = [];
    for (let [key, value] of responseObj) {
      if (value.sales !== "No") {
        endtime[k] = key; //recording of all goods on sales
        k++;
      }
    }
    let len2 = carysel2.children.length;
    for (let i = 0; i < len2; i++) {
      // mb possible to get all goods
      // or vary number of li
      carysel2.children[i].innerHTML = `<img src="${
        responseObj.get(endtime[i]).src
      }.png"</img><div></div>`;
      initializeClock(carysel2.children[i], responseObj.get(endtime[i]).sales);
    }
  } else if (request.status == 404) {
    console.log("Ресурс не найден");
  } else {
    console.log(String(request.status));
  }
}
