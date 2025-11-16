const input=document.getElementById("enter-task");
const addBtn=document.querySelector(".btn");
const taskContainer=document.querySelector("ul");


class EditAndDelBtn{
    constructor(text,taskId){
        const li = document.createElement("li");
        const div = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        editBtn.textContent="Edit";
        deleteBtn.textContent="Delete";
        editBtn.setAttribute("class","edit btn");
        deleteBtn.setAttribute("class","delete btn");
        div.append(editBtn);
        div.append(deleteBtn);
        li.textContent = text;
        li.append(div);
        li.setAttribute("id",taskId);
        this.task=li;
    }
}

let taskId=localStorage.length;
for(let i=0; i<taskId; i++)
{
    const newTask=new EditAndDelBtn(localStorage.getItem(i),i);
    taskContainer.append(newTask.task);
}


document.body.addEventListener("click",(e)=>{
    console.log(e.target);
})



addBtn.addEventListener("click",(e)=>{
    if(input.value.trim()!=="")
    {
        addTask();
    }
})

document.body.addEventListener("keydown",(e)=>{
    if(e.key==="Enter")
    {
        addTask();
    }
})


const addTask=()=>{
    localStorage.setItem(taskId,input.value);
    const newTask=new EditAndDelBtn(input.value,taskId);
    taskContainer.append(newTask.task);
    input.value="";
}


