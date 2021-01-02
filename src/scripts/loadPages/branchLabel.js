export default function branchLabel() {
  if (document.getElementById("numberItems") !== null) {
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
}
