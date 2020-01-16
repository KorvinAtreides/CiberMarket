function User(name, pass){
    this.name = name;
    this.pass = pass;

    this.getType = function(){        return this.name;    }
    this.getDate = function(){        return this.pass;    }
}
if (document.getElementById("btnForReg") !== null){document.getElementById("btnForReg").addEventListener('click', function(){
    let valid=true;
    for(let inpyt of inpyts){
        if (inpyt.validity.valid == false) {
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
        let responseObj = new Map(JSON.parse(request.response));
        let login =  document.getElementById("loginReg").value;
        let pass = document.getElementById("passwordReg").value;
        let i =0;
        for (var [key, value] of responseObj) {
            if (responseObj.get(key).name == login) {  i++;} 
        }
        if(i!=0){alert('there is an account with this login')}
        else{
            let stypid = new User(login, pass);
            let stypidMap = new Map;
            stypidMap.set(`${responseObj.size+1}`,stypid)
            let rfgf=String (JSON.stringify([...stypidMap]))
            fetch('http://localhost:3000/users', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                    },
                body: rfgf.slice(1, -1)
            })
            alert(`thanks for registration, ${login}`)
            document.getElementById("loginReg").value="";
            document.getElementById("passwordReg").value="";
            let currentUser=login;
            localStorage.setItem("currentUser",currentUser);
            document.location.href = "./index.html";
        }

    }
    else if(status==404){
       console.log("Ресурс не найден")}
    else{
       console.log(request.statusText)}
    }
});}