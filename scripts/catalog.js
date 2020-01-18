function goods(id, name, category, price, src, country, sales, number){
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.src = src;
    this.country = country;
    this.sales = sales;
    this.number = number;
    this.getId = function(){        return this.id;    }
    this.getName = function(){        return this.name;    }
    this.getCategory = function(){        return this.category;    }
    this.getPrice = function(){        return this.price;    }
    this.getSrc = function(){        return this.src;    }
    this.getCountry = function(){        return this.country;    }
    this.getSales = function(){        return this.sales;    }
    this.getNumber = function(){        return this.number;    }
}
if (document.getElementById("catalog")!== null) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/goods", false);
    request.send();
    var status = request.status;
    if(status==200){
        let responseObj = new Map(JSON.parse(request.response));
        for (let i = 0; i < 60; i+=4) {
            let li = document.createElement("li"); 
            let ul = document.getElementById("catalog")
            ul.appendChild(li)//.append("spanElement"," ", "newTodo"," ", "time.value"," ");
            li.innerHTML=`<img src="${responseObj.get(String(i+1)).src}.png"</img>
            <div>
                <h3>${responseObj.get(String(i+1)).name}</h3>
                <div class="counter">
                    <span class="arrow arrLeft" id="arrLeft${i+1}"><i class="fas fa-chevron-left"></i></span>
                    <input type="text" value="1" pattern="^[ 0-9]+$" required></input>
                    <span class="arrow arrRight" id="arrRight${i+1}"> <i class="fas fa-chevron-right"></i></span>
                </div>
                <h3>Price per one item: ${responseObj.get(String(i+1)).price}$</h3>
                <h3>Made in ${responseObj.get(String(i+1)).country}</h3>
                <div class="btnBranch" id="btn${responseObj.get(String(i+1)).id}">
                <h3>Add into Branch</h3>
                </div>
                <div class="divSale" id="divSale${i+1}">
                </div>
            </div>`
            inpytVal();
            if (responseObj.get(String(i+1)).sales!="No") {
                document.getElementById(`divSale${i+1}`).innerHTML+=`<h3>Sales!</h3><div></div>`
                initializeClock(document.getElementById(`divSale${i+1}`), responseObj.get(String(i+1)).sales)
            }
        }
        clickArrow();
    }
    else if(status==404){
       console.log("Ресурс не найден")
    }
    else{
       console.log(request.statusText)
    }
}

if (document.getElementById("confirm")!== null) {
    document.getElementById("confirm").addEventListener('click', function(){
        let i=0;
        let k=0;
        let checks=document.getElementsByClassName("checkCategory")
        for(check of checks){if (check.checked==true){i++}}
        let checks2=document.getElementsByClassName("checkCountry")
        for(check of checks2){if (check.checked==true){k++}}
        let priceMina=+document.getElementById("PriceSel").children[0].value
        let priceMaxa=+document.getElementById("PriceSel").children[1].value
        if (i==0 || k==0) {alert('You have to choose at least one category and one country')}
        else if(priceMina>=priceMaxa){alert('You have to choose price filter correctly')}
        else{
            var request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000/goods", false);
            request.send();
            var status = request.status;
            if(status==200){
                let responseObj = new Map(JSON.parse(request.response));
                let ul = document.getElementById("catalog")
                ul.innerHTML="";
                for (let i = 0; i < responseObj.size; i++) {
                    let li = document.createElement("li"); 
                    let category =responseObj.get(String(i+1)).category
                    let priceMin=+document.getElementById("PriceSel").children[0].value
                    let priceMax=+document.getElementById("PriceSel").children[1].value
                    let country =responseObj.get(String(i+1)).country
                    if(document.getElementById(String(category)).checked==true &&
                    Number(responseObj.get(String(i+1)).price)<=priceMax && Number(responseObj.get(String(i+1)).price) >=priceMin &&
                    document.getElementById(String(country)).checked==true && 
                    ((responseObj.get(String(i+1)).sales!="No" && document.getElementById("Sales").checked==true )||document.getElementById("Sales").checked==false)){
                        ul.appendChild(li)
                        li.innerHTML=`<img src="${responseObj.get(String(i+1)).src}.png"</img>
                        <div>
                            <h3>${responseObj.get(String(i+1)).name}</h3>
                            <div class="counter">
                                <span class="arrow arrLeft" id="arrLeft${i+1}"><i class="fas fa-chevron-left"></i></span>
                                <input type="text" value="1" pattern="^[ 0-9]+$" required></input>
                                <span class="arrow arrRight" id="arrRight${i+1}"> <i class="fas fa-chevron-right"></i></span>
                            </div>
                            <h3>Price per one item: ${responseObj.get(String(i+1)).price}$</h3>
                            <h3>Made in ${responseObj.get(String(i+1)).country}</h3>
                            <div class="btnBranch" id="btn${responseObj.get(String(i+1)).id}">
                            <h3>Add into Branch</h3>
                            </div>
                            <div class="divSale" id="divSale${i+1}">
                            </div>
                        </div>`
                        inpytVal();
                        if (responseObj.get(String(i+1)).sales!="No") {
                            document.getElementById(`divSale${i+1}`).innerHTML+=`<h3>Sales!</h3><div></div>`
                            initializeClock(document.getElementById(`divSale${i+1}`), responseObj.get(String(i+1)).sales)
                        }
                    }
                }
                clickArrow();
            }
            else if(status==404){console.log("Ресурс не найден")}
            else{console.log(request.statusText) }
        }
    })
}

function clickArrow(){
    let arrows = document.getElementsByClassName("arrow")
    for (let arrow of arrows){
        arrow.addEventListener('click', function(){            
            if (arrow.classList.contains("arrLeft")){
                let val= arrow.nextElementSibling.value
                val--
                arrow.nextElementSibling.value=String(val)
                if (Number(arrow.nextElementSibling.value)<=0) {arrow.nextElementSibling.value="1"}
            } else{
                let val= arrow.previousElementSibling.value
                val++
                arrow.previousElementSibling.value=String(val) 
            }
        })
    }
}


if (document.getElementsByTagName("input") !== null){
    var inpyts = document.getElementsByTagName("input");
    inpytVal();
}
function inpytVal(){
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
function getTimeRemaining(endtime){
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
function initializeClock(elem, endtime){
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
