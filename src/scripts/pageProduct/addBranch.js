import branchLabel from "../loadPages/branchLabel";

export default function addBranch(id, rest) {
  let elem = document.getElementById(String(id));
  elem.addEventListener("click", function () {
    let number = elem.parentElement.children[2].children[1].value;
    if (Number(number) <= Number(rest)) {
      let mapGoods;
      if (localStorage.getItem("goodsInBranch") != undefined) {
        mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
      } else {
        mapGoods = new Map();
      }
      if (mapGoods.get(String(id)) != undefined) {
        let was = mapGoods.get(String(id));
        mapGoods.delete(String(id));
        mapGoods.set(String(id), Number(was) + Number(number));
      } else {
        mapGoods.set(String(id), Number(number));
      }
      localStorage.setItem("goodsInBranch", JSON.stringify([...mapGoods]));
      branchLabel();
    } else {
      alert("You choose too much items");
    }
  });
}
