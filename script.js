let tasklist = document.getElementById("taskdiary");
let newtask = document.getElementById("taskdetail");

let Alltasks = []; //Array to hold all the tasks
let taskid = 0;
fetchtasks();

/* Function to add new task to the array */

newtask.addEventListener("keyup", function (event){
  if(event.keyCode == 13){
    addnewtask(); //calls function to add task in array
  }

});

function addnewtask() { //adds task to array
  if(newtask.value == "")
  {
    alert("You can't add blank goals!")
    return;
  }

  var tasktoadd = new Object();
  tasktoadd.taskname = newtask.value;
  tasktoadd.taskid = taskid;
  tasktoadd.status = "Pending";
  Alltasks.push(tasktoadd);
  storagehandle();
  taskid++;
  taskadder(tasktoadd); 
}

function taskadder(task) { //adds the task and other elements to task list column
  let list = document.createElement("div");
  list.setAttribute("id", task.taskid);

  let label = document.createElement("label");
  label.innerHTML = task.taskname;

  let check = document.createElement("input");
  check.setAttribute("id", "cbox")
  check.type = "checkbox";

  check.addEventListener("change", function (event){ //handles checkbox state and status of task
    let x = document.getElementById(task.taskid);
    if (event.currentTarget.checked)
    {
      x.style.textDecoration = "line-through";
      x.style.textDecorationColor = "#BFD8B8";
      task.status = "Completed";
      
    }
    else
    {
      x.style.textDecoration = "none";
      task.status = "Pending";
      
    }
    storagehandle();
  });

  let img = document.createElement("img"); //inserts the trash/delete button image
  img.setAttribute("id", "deltask");
  img.src = "delete.png";

  list.appendChild(label);
  list.appendChild(check);
  list.appendChild(img);
  tasklist.appendChild(list);
  newtask.value="";

  img.addEventListener("click", function () { //removes task through clicking delete button
    tasklist.removeChild(list);
    removeObject(task.taskid);
  });
}

function removeObject(id) {  //removes the task from array
  let i;
  for(i=0; i<Alltasks.length; i++)
  {
    let Object = Alltasks[i];
    if(Object.taskid == id){
      break;
    }
  }
  Alltasks.splice(i,1);
  storagehandle();

}

function storagehandle(){
  localStorage.tasks = JSON.stringify(Alltasks);
}

function fetchtasks(){
  if(localStorage.tasks)
  {
    Alltasks = JSON.parse(localStorage.tasks);
  }
  Alltasks.forEach(function(task){
    taskadder(task);
  })
}

