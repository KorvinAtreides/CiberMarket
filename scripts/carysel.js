if (document.getElementById("carysel1")!== null) {
    let len=document.getElementById("carysel1").children.length;//список кол-ва li в карусели
    document.getElementById("caryselDiv1").innerHTML+=`<div id="circles"></div>`
    for (let i = 0; i < len; i++){//запись кружков для отображения
        document.getElementById("circles").innerHTML+=`<span id="spanCircle${i}"><i class="fas fa-circle"></i></span>`
    }
    let circles = document.getElementById("circles").children;
    for(let circle of circles){
        circle.addEventListener('click', function(){//кликер
            let k;
            for (let i = 0; i < len; i++){
                if(document.getElementById("carysel1").children[i].classList.contains("active")){
                    k=i; //какой эл был активен
                }
            }
            document.getElementById("carysel1").children[k].classList.remove("active")
            document.getElementById("carysel1").children[k].classList.add("notActive")
            let str=circle.id.slice(-1);//какой эл щас активен
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
                    k=i;//какой эл был активен
                }
            }
            if(arrow.id =='arrLeft'){//левая стрелка
                if(k==0){//если нулевой, то последний актиен
                    document.getElementById("carysel1").children[k].classList.remove("active")
                    document.getElementById("carysel1").children[k].classList.add("notActive")
                    document.getElementById("carysel1").children[len-1].classList.remove("notActive")
                    document.getElementById("carysel1").children[len-1].classList.add("active")
                } else{//иначе предыдущий
                    document.getElementById("carysel1").children[k].classList.remove("active")
                    document.getElementById("carysel1").children[k].classList.add("notActive")
                    document.getElementById("carysel1").children[k-1].classList.remove("notActive")
                    document.getElementById("carysel1").children[k-1].classList.add("active")
                }
            }
            if(arrow.id =='arrRight'){//правая стрелка
                if(k==len-1){//если последний, то первый актиен
                    document.getElementById("carysel1").children[k].classList.remove("active")
                    document.getElementById("carysel1").children[k].classList.add("notActive")
                    document.getElementById("carysel1").children[0].classList.remove("notActive")
                    document.getElementById("carysel1").children[0].classList.add("active")
                } else{//иначе следующий
                    document.getElementById("carysel1").children[k].classList.remove("active")
                    document.getElementById("carysel1").children[k].classList.add("notActive")
                    document.getElementById("carysel1").children[k+1].classList.remove("notActive")
                    document.getElementById("carysel1").children[k+1].classList.add("active")
                }
            }
            if(arrow.id =='arrLeft2'){//если вторая карусель и левая стрелка
                k=3;
                let arr =[];
                let len2=document.getElementById("carysel2").children.length;
                for (let i = len2-1; i >= 0; i--){
                    if(document.getElementById("carysel2").children[i].classList.contains("active")){
                       arr[k]=i; //какие элементы активны
                       k--;
                    }
                }
                if(arr[0]==0){//если первый элемент среди активных находится в начале
                    document.getElementById("carysel2").children[3].classList.remove("active")
                    document.getElementById("carysel2").children[3].classList.add("notActive")
                    let li = document.getElementById("carysel2").children[len2-1]
                    li.classList.remove("notActive")
                    li.classList.add("active")//последний актиен и достраивается вперёд
                    document.getElementById("carysel2").removeChild(li)
                    document.getElementById("carysel2").prepend(li)
                } else{//иначе смещается влево
                    document.getElementById("carysel2").children[arr[3]].classList.remove("active")
                    document.getElementById("carysel2").children[arr[3]].classList.add("notActive")
                    document.getElementById("carysel2").children[arr[0]-1].classList.remove("notActive")
                    document.getElementById("carysel2").children[arr[0]-1].classList.add("active")
                }
            }
            if(arrow.id =='arrRight2'){//если вторая карусель и правая стрелка
                k=0;
                let arr =[];
                let len2=document.getElementById("carysel2").children.length;
                for (let i = 0; i < len2; i++){
                    if(document.getElementById("carysel2").children[i].classList.contains("active")){
                        arr[k]=i;//какие элементы активны
                        k++;
                    }
                }
                if(arr[3]==len2-1){//если последний элемент среди активных находится в конце
                    document.getElementById("carysel2").children[len2-4].classList.remove("active")
                    document.getElementById("carysel2").children[len2-4].classList.add("notActive")
                    let li = document.getElementById("carysel2").children[0]
                    li.classList.remove("notActive")//первый активен и достраивается назад
                    li.classList.add("active")
                    document.getElementById("carysel2").removeChild(li)
                    document.getElementById("carysel2").appendChild(li)
                    
                } else{//иначе смещается вправо
                    document.getElementById("carysel2").children[arr[0]].classList.remove("active")
                    document.getElementById("carysel2").children[arr[0]].classList.add("notActive")
                    document.getElementById("carysel2").children[arr[3]+1].classList.remove("notActive")
                    document.getElementById("carysel2").children[arr[3]+1].classList.add("active")
                }
            }
        })
    }
}