function User(name, pass){
    this.name = name;
    this.pass = pass;
    this.getType = function(){        return this.name;    }
    this.getDate = function(){        return this.pass;    }
} 

if (document.getElementById("btnForReg") !== null){
    document.getElementById("btnForReg").addEventListener('click', function(){
    let valid=true;
    for(let inpyt of inpyts){
        if (inpyt.validity.valid == false) {  //проверка валидности инпутов
            inpyt.value = ""; 
            valid=false;
            alert('неверное значение');

        }        
    }
    if(valid){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/users", false);
    request.send();
    var status = request.status;
    if(status==200){
        let responseObj = new Map(JSON.parse(request.response)); //запрос на сервер
        let login =  document.getElementById("loginReg").value;
        let pass = document.getElementById("passwordReg").value;
        let i =0;
        for (var [key, value] of responseObj) {
            if (value.name == login) {  i++;} 
        } // если нашёл юзера с таким же логином - алерт
        if(i!=0){alert('there is an account with this login')}
        else{
            let stypid = new User(login, pass); // создаём объёкт
            let stypidMap = new Map;
            stypidMap.set(`${responseObj.size+1}`,stypid) //объект в Map
            let rfgf=String (JSON.stringify([...stypidMap])) // JSON.stringify плохо 
            fetch('http://localhost:3000/users', { //переносит Map, этот фокус позволяет 
                method: 'post', // преобразовать Map в JSON, но там образуются лишние скобки []
                headers: { // json-server их считает лишними и отказыается делать post
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json' // slice их убирает
                    }, // с localStorage таких проблем нет, записывается и считывается без слайса
                body: rfgf.slice(1, -1)
            })
            alert(`thanks for registration, ${login}`)
            document.getElementById("loginReg").value="";
            document.getElementById("passwordReg").value="";
            let currentUser=login;
            localStorage.setItem("currentUser",currentUser); //запоминаем, кто в сети
            document.location.href = "./index.html";
        }

    }
    else if(status==404){
       console.log("Ресурс не найден")}
    else{
       console.log(request.statusText)}
    }
});}