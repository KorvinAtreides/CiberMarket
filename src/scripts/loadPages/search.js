export default function search() {
  if (document.getElementById("searchBtn") !== null) {
    searchBtn.addEventListener("click", function () {
      if (searchBtn.previousElementSibling.value != "") {
        localStorage.setItem(
          "searchItem",
          searchBtn.previousElementSibling.value
        );
        document.location.href = "./productCatalog.html";
      } // if searchItem exists, searching starts in catalog page
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
