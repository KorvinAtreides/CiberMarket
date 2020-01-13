document.getElementById("btnForLogin").addEventListener('click', function(){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/users", false);
    request.send();
    var status = request.status;
    if(status==200){
    let responseObj = new Map(JSON.parse(request.response));
    let login =  document.getElementById("login").value;
    let pass = document.getElementById("password").value;
    for (var [key, value] of responseObj) {
        console.log(responseObj.get(key));
        if (responseObj.get(key).name == login) {
            if (responseObj.get(key).pass == pass){
                alert(`Hello, ${key},
                welcome to your account`)
            } else {alert('Not correct login or password')}
        }
 //           myMap.set('change',responseObj.get(key));
        }
    }
    else if(status==404){
       console.log("Ресурс не найден")}
    else{
       console.log(request.statusText)}

});
document.getElementById("btnForReg").addEventListener('click', function(){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/users", false);
    request.send();
    var status = request.status;
    if(status==200){
    let responseObj = new Map(JSON.parse(request.response));
    let login =  document.getElementById("loginReg").value;
    let pass = document.getElementById("passwordReg").value;
    let i =0;
    for (var [key, value] of responseObj) {
        console.log(responseObj.get(key));
        if (responseObj.get(key).name == login) {  i++;} 
        if(i!=0){alert('there is an account with this login')}
            else{
                let stypid = new User(login, pass);
                fetch('http://localhost:3000/users', {
                method: 'post',
                headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                body: JSON.stringify([...stypid])
    })
        }
    }
 //           myMap.set('change',responseObj.get(key));
        }
    else if(status==404){
       console.log("Ресурс не найден")}
    else{
       console.log(request.statusText)}

});
function User(name, pass){
    this.name = name;
    this.pass = pass;

    this.getType = function(){        return this.name;    }
    this.getDate = function(){        return this.pass;    }

}