export default function branchLabel() {
  if (document.getElementById("numberItems") !== null) {
    let itemsValue = 0;
    let mapGoods;
    if (localStorage.getItem("goodsInBranch") != undefined) {
      mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
      for (let [key, value] of mapGoods) {
        itemsValue += value;
      }
      numberItems.value = itemsValue;
    } else {
      numberItems.value = 0;
    }
  }
}
