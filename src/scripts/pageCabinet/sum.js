export default function sum() {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/goods", false);
  request.send();
  let status = request.status;
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
