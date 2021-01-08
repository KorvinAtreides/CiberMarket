export default function search() {
  if (document.getElementById("searchBtn") !== null) {
    searchBtn.addEventListener("click", function () {
      if (searchBtn.previousElementSibling.value != "") {
        localStorage.setItem(
          "searchItem",
          searchBtn.previousElementSibling.value
        );
        document.location.href = "./productCatalog.html";
      } // если будет сущ searchItem, то при загрузке каталога будет уже сам поиск работать
    });
    document
      .getElementById("search")
      .addEventListener("keydown", function (event) {
        let code;
        if (event.key !== undefined) {
          code = event.key;
        } else if (event.keyIdentifier !== undefined) {
          code = event.keyIdentifier;
        } else if (event.keyCode !== undefined) {
          code = event.keyCode;
        }
        if (code == 13 || code == "Enter") {
          if (searchBtn.previousElementSibling.value != "") {
            localStorage.setItem(
              "searchItem",
              searchBtn.previousElementSibling.value
            );
            document.location.href = "./productCatalog.html";
          }
        }
      });
  }
}
