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
if (document.getElementById("carysel2")!== null) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/goods", false);
    request.send();
    var status = request.status;
    if(status==200){
        let responseObj = new Map(JSON.parse(request.response));

        let len1 = document.getElementById("carysel1").children.length;
        let first =["23","26","13","47","37","2","4"]
        for (let i = 0; i < len1; i++){
            document.getElementById("carysel1").children[i].innerHTML=`<img src="${responseObj.get(first[i]).src}.png"</img>`
        }

        let k=0;
        let endtime =[];
        for (var [key, value] of responseObj) {
            if (responseObj.get(key).sales !=="No" ) {
                endtime[k]=key;
                k++;
            } 
        }
        let len2=document.getElementById("carysel2").children.length;
        for (let i = 0; i < len2; i++){
            document.getElementById("carysel2").children[i].innerHTML=`<img src="${responseObj.get(endtime[i]).src}.png"</img><div></div>`
            initializeClock(document.getElementById("carysel2").children[i], responseObj.get(endtime[i]).sales)
        }
    }
    else if(status==404){
       console.log("Ресурс не найден")
    }
    else{
       console.log(request.statusText)
    }
    
}
//сам счётчик
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
//вызов таймера
function initializeClock(elem, endtime){
    var timeinterval = setInterval(function(){
     var t = getTimeRemaining(endtime);
     if (t.total>0){
        elem.lastChild.innerHTML = t.days + ' days '+ t.hours +   ' hours '  + t.minutes + ' minutes ' +  t.seconds +    ' seconds ';
     }
     else{
        elem.innerHTML = 'Time is over!!!';
     }
     if(t.total<=0){
      clearInterval(timeinterval);
     }
    },1000);
}