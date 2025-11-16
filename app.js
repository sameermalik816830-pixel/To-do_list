const input=document.getElementById("enter-task");
const addBtn=document.querySelector("button");
const taskContainer=document.querySelector("ul");




let taskId=localStorage.length;




addBtn.addEventListener("click",(e)=>{
    if(input.textContent.trim()!=="")
    {
        localStorage.setItem(taskId,input.textContent);
        taskId++;
        const li=document.createElement("li");
        li.textContent=input.textContent;
        taskContainer.append(li);
    }
})

document.body.addEventListener("keydown",(e)=>{
    if(e.key==="Enter")
    {
        localStorage.setItem(taskId,input.textContent);
        taskId++;
    }
})
