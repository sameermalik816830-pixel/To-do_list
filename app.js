const input=document.getElementById("enter-task");
const addBtn=document.querySelector(".add-item");
const taskContainer=document.querySelector("ul");
const editWindow=document.querySelector("dialog");
const cancelBtn=document.getElementById("cancel");
const saveBtn=document.getElementById("save");
const editInput=document.getElementById("edit");
const msg=document.querySelector(".container p");
const editMsg=document.querySelector("dialog p");
let tasks;


const showTask=(tasks)=>{
    for(let task of tasks)
    {
        const text=truncate(task.task);
        const li=createLi(text,task.id);
        taskContainer.append(li);
    }

}

window.addEventListener("load",(e)=>{
    tasks=JSON.parse(localStorage.getItem("task")) || [];
    if(tasks.length===0){
        tasks=null;
        return;
    }
    showTask(tasks);
})

function truncate(text){
    if(text.length<=20)
    {
        return text;
    }
    return text.substring(0,20)+"...";
}



function createLi(text,taskId){
    const li = document.createElement("li");
    const div = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const span=document.createElement("span");
    editBtn.textContent="Edit";
    deleteBtn.textContent="Delete";
    editBtn.setAttribute("class","edit btn");
    deleteBtn.setAttribute("class","delete btn");
    span.textContent=text;
    
    div.append(editBtn);
    div.append(deleteBtn);
    li.append(span);
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
        const task=e.target.parentElement.parentElement;
        editTask(task);
    }
    else if(e.target.localName==="button" && e.target.textContent==="Delete"){
        deleteTask(e.target.parentElement.parentElement.getAttribute("id"));
    }
})


const deleteTask=(id)=>{
    if(!confirm("Are you sure that you want to delete the task?")){
        return;
    }
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




const editTask=(task)=>{
    const id=task.getAttribute("id");
    const taskVal=task.firstElementChild.textContent;
    editInput.value=taskVal;
    localStorage.setItem("id",JSON.stringify(id));
    editWindow.showModal();
}

cancelBtn.addEventListener("click",(e)=>{
    editWindow.close();
})
saveBtn.addEventListener("click",(e)=>{
    const editedTask=editInput.value;
    if(editedTask.trim()!==""){
        editMsg.setAttribute("id","hide");
        updateTask(editedTask);
        editWindow.close();
    }
    else{
        editMsg.setAttribute("id","show");
    }
    
})


const updateTask=(editedTask)=>{
    const allTask=JSON.parse(localStorage.getItem("task"));
    const id=JSON.parse(localStorage.getItem("id"));
    for(let task of allTask)
    {
        if(task.id==id)
        {
            console.log("new");
            task.task=editedTask;
            localStorage.setItem("task",JSON.stringify(allTask));
            location.reload();
            break;
        }
    }

}


addBtn.addEventListener("click",(e)=>{
    if(input.value.trim()!=="")
    {
        msg.setAttribute("id","hide");
        addTask();
    }
    else{
        msg.setAttribute("id","show");
    }
})

document.body.addEventListener("keydown",(e)=>{
    if(e.key==="Enter")
    {
        if(input.value.trim()!==""){
            msg.setAttribute("id","hide");
            addTask();
        }
        else{
            msg.setAttribute("id","show");
        }
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



