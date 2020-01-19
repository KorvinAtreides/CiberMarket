if  (document.getElementById("menuUl") !== null){ //проверка есть ли в системе пользователь
    if (localStorage.getItem("currentUser")!=undefined){
        let children=document.getElementById("menuUl").children
        let len =children.length
        children[len-1].innerHTML=`
        Hello, ${localStorage.getItem("currentUser")}!<br><a href="./PersonalCabinet.html">Personal Cabinet</a> <br> <a id="LogOut">LogOut</a></li>`
    }
}
if (document.getElementById("LogOut") !== null) {
    document.getElementById("LogOut").addEventListener('click', function(){
        localStorage.removeItem("currentUser")//обнуление корзины и юзера
        localStorage.removeItem("goodsInBranch")
        document.getElementById("numberItems").value=0
        let children=document.getElementById("menuUl").children
        let len =children.length
        children[len-1].innerHTML=`
        Hello, visitor! <br> <a href="./login.html">SignIn </a>or <a href="./register.html">SignUp</a></li>`
    })
}