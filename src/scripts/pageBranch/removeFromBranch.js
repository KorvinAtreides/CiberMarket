import branchLabel from "../loadPages/branchLabel";
import sum from "../pageCabinet/sum";

export default function removeFromBranch(id) {
  let elem = document.getElementById(String(id));
  elem.addEventListener("click", function () {
    mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
    mapGoods.delete(String(id)); //всё стирается
    localStorage.setItem("goodsInBranch", JSON.stringify([...mapGoods]));
    branchLabel();
    elem.parentElement.parentElement.remove();
    if (document.getElementById("sum") != null) {
      sum(); //для личного кабинета
    }
    let ul = document.getElementById("branchUl");
    if (ul.innerHTML == "") {
      ul.innerHTML = `<div>
          <h3>Sorry, the branch is empty</h3>
          <h3>Please, add something in it</h3>
        </div>`; //если ничего не осталось
    }
  });
}
