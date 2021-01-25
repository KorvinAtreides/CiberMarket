import branchLabel from "../loadPages/branchLabel";

export default function updateBranch() {
  let arrows = document.getElementsByClassName("arrow");
  for (let arrow of arrows) {
    arrow.addEventListener("click", function () {
      let id = String(
        arrow.parentElement.nextElementSibling.nextElementSibling
          .nextElementSibling.id
      );
      let number = arrow.parentElement.children[1].value;
      let mapGoods = new Map(JSON.parse(localStorage.getItem("goodsInBranch")));
      mapGoods.delete(String(id));
      mapGoods.set(String(id), Number(number));
      localStorage.setItem("goodsInBranch", JSON.stringify([...mapGoods]));
      branchLabel();
    });
  }
}
