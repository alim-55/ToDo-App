const content = document.getElementById("content");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (content.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = content.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '<i class="fas fa-trash-alt"></i>';
        li.appendChild(span);
    }
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