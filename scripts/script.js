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
if (document.getElementById("numberItems") !== null){
    branchLabel();
}
function branchLabel(){
    let numberItems =0;
    let mapGoods
    if (localStorage.getItem("goodsInBranch")!=undefined){
        mapGoods = new Map (JSON.parse(localStorage.getItem("goodsInBranch")))
        for (let [key, value] of mapGoods) {
            numberItems+=value;
        }
        document.getElementById("numberItems").value=numberItems;
    }  else{document.getElementById("numberItems").value=0}
}