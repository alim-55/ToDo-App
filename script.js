const content = document.getElementById("content");
const listContainer = document.getElementById("list-container");
let toastBox = document.getElementById('toastBox');
let successMsg = '<i class="fa-solid fa-circle-check"></i>Successfully added';
let errorMsg = '<i class="fa-solid fa-circle-xmark"></i>Something went wrong!';


function addTask(msg) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    //toast.innerHTML = msg;
    //toastBox.appendChild(toast);

    if (content.value === '') {
        toast.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>Task cannot be empty!';
        toastBox.appendChild(toast);
        toast.classList.add('error');
        //alert("You must write something!");
        // if(msg.includes('wrong')){
        //     toast.classList.add('error');
        // }
    }
    else {
        toast.innerHTML = '<i class="fa-solid fa-circle-check"></i>Successfully added';
        toastBox.appendChild(toast);
        toast.classList.add('sucess');
        let li = document.createElement("li");
        li.innerHTML = content.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '<i class="fas fa-trash-alt"></i>';
        li.appendChild(span);
    }
    setTimeout(()=>{
        toast.remove();
    },2000);
    content.value = "";
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
},false);