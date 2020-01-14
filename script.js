// var currentUser
// localStorage.setItem('currentUser',currentUser);
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
                // currentUser=responseObj.get(key).name;
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
            // currentUser=responseObj.get(key).name;
            document.location.href = "./index.html";
        }

    }
    else if(status==404){
       console.log("Ресурс не найден")}
    else{
       console.log(request.statusText)}
    }
});}

function User(name, pass){
    this.name = name;
    this.pass = pass;

    this.getType = function(){        return this.name;    }
    this.getDate = function(){        return this.pass;    }
}


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

if (document.getElementById("carysel1")!== null) {
    let len=document.getElementById("carysel1").children.length;
    document.getElementById("caryselDiv1").innerHTML+=`<div id="circles"></div>`
    for (let i = 0; i < len; i++){
        document.getElementById("circles").innerHTML+=`<span id="spanCircle${i}"><i class="fas fa-circle"></i></span>`
    }
    let circles = document.getElementById("circles").children;
    for(let circle of circles){
        circle.addEventListener('click', function(){
            let k;
            for (let i = 0; i < len; i++){
                if(document.getElementById("carysel1").children[i].classList.contains("active")){
                    k=i;
                }
            }
            document.getElementById("carysel1").children[k].classList.remove("active")
            document.getElementById("carysel1").children[k].classList.add("notActive")
            let str=circle.id.slice(-1);
            document.getElementById("carysel1").children[str].classList.remove("notActive")
            document.getElementById("carysel1").children[str].classList.add("active")
        })
    }
    let arrows = document.getElementsByClassName('arrow');
    for(let arrow of arrows){
        arrow.addEventListener('click', function(){
            let k;
            for (let i = 0; i < len; i++){
                if(document.getElementById("carysel1").children[i].classList.contains("active")){
                    k=i;
                }
            }
            if(arrow.id =='arrLeft'){
                if(k==0){
                    document.getElementById("carysel1").children[k].classList.remove("active")
                    document.getElementById("carysel1").children[k].classList.add("notActive")
                    document.getElementById("carysel1").children[len-1].classList.remove("notActive")
                    document.getElementById("carysel1").children[len-1].classList.add("active")
                } else{
                    document.getElementById("carysel1").children[k].classList.remove("active")
                    document.getElementById("carysel1").children[k].classList.add("notActive")
                    document.getElementById("carysel1").children[k-1].classList.remove("notActive")
                    document.getElementById("carysel1").children[k-1].classList.add("active")
                }
            }
            if(arrow.id =='arrRight'){
                if(k==len-1){
                    document.getElementById("carysel1").children[k].classList.remove("active")
                    document.getElementById("carysel1").children[k].classList.add("notActive")
                    document.getElementById("carysel1").children[0].classList.remove("notActive")
                    document.getElementById("carysel1").children[0].classList.add("active")
                } else{
                    document.getElementById("carysel1").children[k].classList.remove("active")
                    document.getElementById("carysel1").children[k].classList.add("notActive")
                    document.getElementById("carysel1").children[k+1].classList.remove("notActive")
                    document.getElementById("carysel1").children[k+1].classList.add("active")
                }
            }
            if(arrow.id =='arrLeft2'){
                k=3;
                let arr =[];
                let len2=document.getElementById("carysel2").children.length;
                for (let i = len2-1; i >= 0; i--){
                    if(document.getElementById("carysel2").children[i].classList.contains("active")){
                       arr[k]=i;
                       k--;
                    }
                }
                if(arr[0]==0){
                    k=len2-1;
                    for (let i = len2-1; i >=len2-3; i--){
                        if(document.getElementById("carysel2").children[i].classList.contains("active")){
                           k=i-1;
                        }
                    }
                    document.getElementById("carysel2").children[k-len2+4].classList.remove("active")
                    document.getElementById("carysel2").children[k-len2+4].classList.add("notActive")
                    document.getElementById("carysel2").children[k].classList.remove("notActive")
                    document.getElementById("carysel2").children[k].classList.add("active")
                } else{
                    document.getElementById("carysel2").children[arr[3]].classList.remove("active")
                    document.getElementById("carysel2").children[arr[3]].classList.add("notActive")
                    document.getElementById("carysel2").children[arr[0]-1].classList.remove("notActive")
                    document.getElementById("carysel2").children[arr[0]-1].classList.add("active")
                }
            }
            if(arrow.id =='arrRight2'){
                k=0;
                let arr =[];
                let len2=document.getElementById("carysel2").children.length;
                for (let i = 0; i < len2; i++){
                    if(document.getElementById("carysel2").children[i].classList.contains("active")){
                        arr[k]=i;
                        k++;
                    }
                }
                if(arr[3]==len2-1){
                    k=0;
                    for (let i = 0; i <3; i++){
                        if(document.getElementById("carysel2").children[i].classList.contains("active")){
                           k=i+1;
                        }
                    }
                    document.getElementById("carysel2").children[len2+k-4].classList.remove("active")
                    document.getElementById("carysel2").children[len2+k-4].classList.add("notActive")
                    document.getElementById("carysel2").children[k].classList.remove("notActive")
                    document.getElementById("carysel2").children[k].classList.add("active")
                } else{
                    document.getElementById("carysel2").children[arr[0]].classList.remove("active")
                    document.getElementById("carysel2").children[arr[0]].classList.add("notActive")
                    document.getElementById("carysel2").children[arr[3]+1].classList.remove("notActive")
                    document.getElementById("carysel2").children[arr[3]+1].classList.add("active")
                }
            }
        })
    }
}