if (document.getElementById("searchBtn") !== null){
    let searchBtn= document.getElementById("searchBtn") //если есть поисковик
    searchBtn.addEventListener('click', function(){ 
       if (searchBtn.previousElementSibling.value != ""){ //и он не пустой
           localStorage.setItem("searchItem",searchBtn.previousElementSibling.value)
           document.location.href = "./ProductCatalog.html"; //запоминаем условие поиска
       } // если будет сущ searchItem, то при загрузке каталога будет уже сам поиск работать
    })
}