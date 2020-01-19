if (document.getElementById("btnForLogin") !== null){document.getElementById("btnForLogin").addEventListener('click', function(){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/users", false);
    request.send();
    var status = request.status;
    if(status==200){
        let responseObj = new Map(JSON.parse(request.response)); //запрос на сервер
        let login =  document.getElementById("login").value;
        let pass = document.getElementById("password").value;
        let i=0;
        for (var [key, value] of responseObj) {
            if (value.name == login && value.pass == pass){
                i++; //простейшая проверка на правильность
                alert(`Hello, ${value.name},welcome to your account`)
                document.getElementById("login").value="";
                document.getElementById("password").value="";
                let currentUser=value.name;
                localStorage.setItem("currentUser",currentUser); //запоминаем, кто в сети
                document.location.href = "./index.html";
            }
        }
        if (i==0){alert('Not correct login or password')}
    }
    else if(status==404){
       console.log("Ресурс не найден")}
    else{
       console.log(request.statusText)}

});}
