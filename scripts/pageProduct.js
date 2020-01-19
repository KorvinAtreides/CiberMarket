let images = document.querySelectorAll("img") // для всех картинок кроме лого 
for (let image of images){
    if (image.alt!="logo"){
        image.addEventListener("click", function(){ //кликер перехода и считывание имени картинки
            let name =String(image.src).slice(String(image.src).lastIndexOf("/")+1,-4)
            var request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000/goods", false);
            request.send();
            var status = request.status;
            if(status==200){
                let responseObj = new Map(JSON.parse(request.response));
                for (let [key, value] of responseObj) {
                   if (value.name == name){
                       localStorage.removeItem("currentItem") 
                       localStorage.setItem("currentItem",name)//запоминаем выбранный объект
                       document.location.href = "./pageProduct.html";
                   }
                }
            }
            else if(status==404){console.log("Ресурс не найден")}
            else{console.log(request.statusText) }
        })
    }
}
if (document.getElementById("flexProd")!== null) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/goods", false);
    request.send();
    var status = request.status; //запрос на сервер
    if(status==200){
        let name = localStorage.getItem("currentItem")
        let responseObj = new Map(JSON.parse(request.response));
        for (let [key, value] of responseObj) {
           if (value.name == name){ //вся инфа по найденному элементу
            document.getElementById("flexProd").innerHTML=`
            <div class="image">
                <img src="${value.src}.png"></img>
            </div>
            <div class="content">
                <h3>${name}</h3>
                <h3>Price per one item: ${value.price}$</h3>
                <div class="counter">
                    <span class="arrow arrLeft" id="arrLeft"><i class="fas fa-chevron-left"></i></span>
                    <input type="text" value="1" pattern="^[ 0-9]+$" required></input>
                    <span class="arrow arrRight" id="arrRight$"> <i class="fas fa-chevron-right"></i></span>
                    <h3>${value.number} pieces available</h3>
                </div>
                <h3>Made in ${value.country}</h3>
                <div id="divStars">
                    <span class="star"><i class="far fa-star"></i></span>
                    <span class="star"><i class="far fa-star"></i></span>
                    <span class="star"><i class="far fa-star"></i></span>
                    <span class="star"><i class="far fa-star"></i></span>
                    <span class="star"><i class="far fa-star"></i></span>
                </div>
                <div class="btnBranch" id="btnBranch${value.id}">
                    <h3>Add into Branch</h3>
                </div>
                <div class="divSale" id="divSale${value.id}">
                </div>
            </div>`
            clickArrow(value.number); //стрелочки
            stars();//звёздочки
            addBranch(`btnBranch${value.id}`,value.number); //кнопка добавки в корзину
            if (value.sales!="No") {//проверка статуса распродажи
                document.getElementById(`divSale${value.id}`).innerHTML+=`<h3>Sales!</h3><div></div>`
                initializeClock(document.getElementById(`divSale${value.id}`), value.sales)
            } 
           }
        }
    }
    else if(status==404){console.log("Ресурс не найден")}
    else{console.log(request.statusText) }    
}

function stars(){
    let stars = document.getElementsByClassName("star")
    for (let star of stars){
        star.addEventListener("click", function(){
            let i=1;
            star.innerHTML=""
            star.innerHTML=`<i class="fas fa-star"></i>`
            let star2=star;
            let star3=star;
            while(star3.previousElementSibling !==null &&i<10){
                star3.previousElementSibling.innerHTML=""//предыдущие закрашиваются
                star3.previousElementSibling.innerHTML=`<i class="fas fa-star"></i>`
                star3=star3.previousElementSibling
                i++ //на всякий случай, я пару раз зациклил страницу
            }
            while(star2.nextElementSibling !==null &&i<20){
                star2.nextElementSibling.innerHTML=""
                star2.nextElementSibling.innerHTML=`<i class="far fa-star"></i>`
                star2=star2.nextElementSibling //следующие очищаются
                i++ 
            }
            
        })
    }
}

if (document.getElementById("sendComment")!== null) { //отправка комментов
    let btn =document.getElementById("sendComment")
    btn.addEventListener('click', function(){ 
        if (btn.previousElementSibling.value!=""){// чтоб не было пустых комментов
            let name
            if(localStorage.getItem("currentUser")!=undefined){
                name= localStorage.getItem("currentUser") 
            }
            else{name= "Visitor"} // для анонимов не сети
            document.getElementById("areacomments").innerHTML+=`
                <div id="comments">
                    <div id="who">${name}:</div>
                    <div id="what">${btn.previousElementSibling.value}</div>
                </div>`
        }
    })
}

function clickArrow(number){
    let arrows = document.getElementsByClassName("arrow")
    for (let arrow of arrows){
        arrow.addEventListener('click', function(){            
            if (arrow.classList.contains("arrLeft")){
                let val= arrow.nextElementSibling.value
                val--
                arrow.nextElementSibling.value=String(val) // уменьшают значение на 1
                if (Number(arrow.nextElementSibling.value)<=0) { //но не менбше 0
                    arrow.nextElementSibling.value="1" 
                }
            } else{
                let val= arrow.previousElementSibling.value //увеличивают на 1
                val++                         //но не больше максимума эл-ов на складе
                if (val<=number){arrow.previousElementSibling.value=String(val) }
            }
        })
    }
}
function addBranch(id,rest){ //кнопка хранит айди элемента на добааление и его остатки на сервере
    let elem =document.getElementById(String(id))
    elem.addEventListener ("click", function () {// кол-во объектов на заказ
        let number = elem.parentElement.children[2].children[1].value 
        if(Number(number)<=Number(rest)){ //но не больше максимума эл-ов на складе
            let mapGoods 
            if (localStorage.getItem("goodsInBranch")!=undefined){//считываение корзины
                mapGoods = new Map (JSON.parse(localStorage.getItem("goodsInBranch")))
            }  else{mapGoods = new Map()}
            if (mapGoods.get(String(id))!=undefined){//если есть этот элемент 
                let was = mapGoods.get(String(id))
                mapGoods.delete(String(id))
                mapGoods.set(String(id),Number(was)+Number(number))//то плюсуем
            } else {mapGoods.set(String(id),Number(number))} // иначе просто записываем
            localStorage.setItem("goodsInBranch",JSON.stringify([...mapGoods]))
            branchLabel()
        } else{alert("You choose too much items")}
    })
}

if (document.getElementsByTagName("input") !== null){
    var inpyts = document.getElementsByTagName("input");
    inpytVal();
}
function inpytVal(){ //проверка валидности
    for(let inpyt of inpyts){
        inpyt.addEventListener ("change", function (event) {
            if (inpyt.validity.valid == false) {
                if (inpyt.parentElement.id=="PriceSel") {
                    inpyt.value = "0"; 
                }else if (inpyt.parentElement.parentElement.id=="menuUl") {
                    inpyt.value = ""; 
                } else{
                    inpyt.value = "1";
                }
                alert('неверное значение');
            }        
        });
    }
}
function getTimeRemaining(endtime){ //счётчик
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
     'total': t,
     'days': days,
     'hours': hours,
     'minutes': minutes,
     'seconds': seconds
    };
}
function initializeClock(elem, endtime){ //вызов счётчика
    var timeinterval = setInterval(function(){
     var t = getTimeRemaining(endtime);
     if (t.total>0){
        elem.children[elem.children.length-1].innerHTML = t.days + ' days '+ t.hours +   ' hours '  + t.minutes + ' minutes ' +  t.seconds +    ' seconds ';
     }
     else{
        elem.innerHTML = 'Time is over!!!';
     }
     if(t.total<=0){
      clearInterval(timeinterval);
     }
    },1000);
}
function branchLabel(){ //перезапись отображения колва элементов в корзине, в хедере 
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