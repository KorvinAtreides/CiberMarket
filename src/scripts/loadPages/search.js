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
  }
}
