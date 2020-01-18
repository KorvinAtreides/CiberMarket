if (document.getElementsByTagName("input") !== null){
    var inpyts = document.getElementsByTagName("input");
    inpytVal();
}//проверка на правильность ввода
function inpytVal(){
    for(let inpyt of inpyts){
        inpyt.addEventListener ("change", function (event) {
            if (inpyt.validity.valid == false) {
                inpyt.value = ""; 
                alert('неверное значение');
            }        
        });
    }
}