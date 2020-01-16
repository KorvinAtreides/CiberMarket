if (document.getElementById("btnForLogin") !== null){document.getElementById("btnForLogin").addEventListener('click', function(){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/users", false);
    request.send();
    var status = request.status;
    if(status==200){
        let responseObj = new Map(JSON.parse(request.response));
        let login =  document.getElementById("login").value;
        let pass = document.getElementById("password").value;
        let i=0;
        for (var [key, value] of responseObj) {
            if (responseObj.get(key).name == login && responseObj.get(key).pass == pass){
                i++;
                alert(`Hello, ${responseObj.get(key).name},welcome to your account`)
                document.getElementById("login").value="";
                document.getElementById("password").value="";
                let currentUser=responseObj.get(key).name;
                localStorage.setItem("currentUser",currentUser);
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
