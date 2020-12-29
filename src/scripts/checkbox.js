if (document.getElementById("flexCatalog")!== null) {
    let checkboxs = document.querySelectorAll("[type=checkbox]")
    for(let checkbox of checkboxs){
        checkbox.addEventListener ("change", function () {
           if (document.getElementById("AllCategory").checked){
                let checks=document.getElementsByClassName("checkCategory")
                for(check of checks){//проверка для главного чек-бокса
                check.checked=true
                check.setAttribute('disabled',"disabled")
                }
           } else{
                let checks=document.getElementsByClassName("checkCategory")
                for(check of checks){
                    check.removeAttribute('disabled')
                }
           }
           if (document.getElementById("defence").checked){
                let checks=document.getElementsByClassName("defence")
                for(check of checks){//проверка для категории дефенс
                check.checked=true
                check.setAttribute('disabled',"disabled")
                }
           } else{
                let checks=document.getElementsByClassName("defence")
                for(check of checks){
                    check.removeAttribute('disabled')
                }
           }
           if (document.getElementById("body").checked){
                let checks=document.getElementsByClassName("Augmentations")
                for(check of checks){//проверка для категории Augmentations
                check.checked=true
                check.setAttribute('disabled',"disabled")
                }
           } else{
                let checks=document.getElementsByClassName("Augmentations")
                for(check of checks){
                    check.removeAttribute('disabled')
                }
           }
           if (document.getElementById("Allcountry").checked){
                let checks=document.getElementsByClassName("checkCountry")
                for(check of checks){//проверка для категории стран
                check.checked=true
                check.setAttribute('disabled',"disabled")
                }
           } else{
                let checks=document.getElementsByClassName("checkCountry")
                for(check of checks){
                    check.removeAttribute('disabled')
                }
           }
        })
    }
}

if (document.getElementById("reset")!== null) {//всё а стандартное значение
    document.getElementById("reset").addEventListener('click', function(){
        document.getElementById("AllCategory").checked=true
        let checks=document.getElementsByClassName("checkCategory")
        for(check of checks){
            check.checked=true
            check.setAttribute('disabled',"disabled")
        }
        document.getElementById("Allcountry").checked=true
        let checks2=document.getElementsByClassName("checkCountry")
        for(check of checks2){
            check.checked=true
        }
        document.getElementById("Sales").checked=true
        document.getElementById("PriceSel").children[0].value=0
        document.getElementById("PriceSel").children[1].value=4999.9
    })
}