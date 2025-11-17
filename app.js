const input=document.getElementById("enter-task");
const addBtn=document.querySelector(".btn");
const taskContainer=document.querySelector("ul");

const tasks=JSON.parse(localStorage.getItem("task")) || []

function truncate(text){
    if(text.length<=20)
    {
        return text;
    }
    return text.substring(0,20)+"...";
}

for(let task of tasks)
{
    const text=truncate(task.task);
    const li=createLi(text,task.id);
    taskContainer.append(li);
}


function createLi(text,taskId){
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
    return li;
}


class NewTask{
    constructor(text,id)
    {
        this.id=id;
        this.task=text;
    }
}



document.body.addEventListener("click",(e)=>{

    if(e.target.localName==="button" && e.target.textContent==="Edit")
    {
        console.dir(e.target);
        editTask(e.target.parentElement.parentElement.getAttribute("id"));
    }
    else if(e.target.localName==="button" && e.target.textContent==="Delete"){
        deleteTask(e.target.parentElement.parentElement.getAttribute("id"));
    }
})


const deleteTask=(id)=>{
    console.log(id);
    const tasks=JSON.parse(localStorage.getItem("task")) || [];
    for(let i=0; i<tasks.length; i++)
    {
        if(tasks[i].id==id)
        {
            tasks.splice(i,1);
            localStorage.setItem("task",JSON.stringify(tasks));
            break;
        }
    }
    const allTask=document.querySelectorAll("li");
    for(let task of allTask){
        if(task.getAttribute("id")===id)
        {
            task.remove();
            break;
        }
    }
}

const editTask=(id)=>{
    console.log(id);
}


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
    const newTaskId=Date.now();
    const text=input.value;
    const newTask=new NewTask(text,newTaskId);
    const tasks=JSON.parse(localStorage.getItem("task")) || [];
    tasks.push(newTask);
    localStorage.setItem("task",JSON.stringify(tasks));
    const li = createLi(truncate(text),newTaskId);
    taskContainer.append(li);
    input.value="";
}



