import branchLabel from "../loadPages/branchLabel";

export default function addBranch(id, rest) {
  //кнопка хранит айди элемента на добааление и его остатки на сервере
  let elem = document.getElementById(String(id));
  elem.addEventListener("click", function () {
    // кол-во объектов на заказ
    let number = elem.parentElement.children[2].children[1].value;
    if (Number(number) <= Number(rest)) {
      //но не больше максимума эл-ов на складе
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
    } else {
      alert("You choose too much items");
    }
  });
}
