import getRequest from "../server/getRequest";

export default function toPageProduct() {
  let images = document.querySelectorAll("img");
  for (let image of images) {
    if (image.alt != "logo") {
      image.onclick = function () {
        let name = String(image.src).slice(
          String(image.src).lastIndexOf("/") + 1,
          -4
        );
        let request = getRequest("goods");
        if (request.status == 200) {
          let responseObj = new Map(JSON.parse(request.object));
          for (let [key, value] of responseObj) {
            if (value.name == name) {
              localStorage.removeItem("currentItem");
              localStorage.setItem("currentItem", name);
              document.location.href = "./pageProduct.html";
            }
          }
        } else if (request.status == 404) {
          console.log("Ресурс не найден");
        } else {
          console.log(String(request.status));
        }
      };
    }
  }
}
