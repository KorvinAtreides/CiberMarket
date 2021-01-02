export default function toPageProduct() {
  let images = document.querySelectorAll("img"); // для всех картинок кроме лого
  for (let image of images) {
    if (image.alt != "logo") {
      image.addEventListener("click", function () {
        //кликер перехода и считывание имени картинки
        let name = String(image.src).slice(
          String(image.src).lastIndexOf("/") + 1,
          -4
        );
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/goods", false);
        request.send();
        let status = request.status;
        if (status == 200) {
          let responseObj = new Map(JSON.parse(request.response));
          for (let [key, value] of responseObj) {
            if (value.name == name) {
              localStorage.removeItem("currentItem");
              localStorage.setItem("currentItem", name); //запоминаем выбранный объект
              document.location.href = "./pageProduct.html";
            }
          }
        } else if (status == 404) {
          console.log("Ресурс не найден");
        } else {
          console.log(request.statusText);
        }
      });
    }
  }
}
