import branchLabel from "../loadPages/branchLabel";

export default function addToBranch(id) {
  //кнопка хранит айди элемента на добааление
  let elem = document.getElementById(String(id));
  elem.onclick = function () {
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
  };
}
