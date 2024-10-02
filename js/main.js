let inputTask = document.getElementById('input-task');
let addBtn = document.getElementById('add');
let tasks = document.querySelector('.app .tasks');

// let modal = `
// <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//                 <input type="text" class="form-control updated-task" placeholder="Enter your updated task">
//             </div>
//             <div class="modal-footer">
//                 <button type="button" class="btn btn-secondary cancel" data-bs-dismiss="modal">Cancel</button>
//                 <button type="button" class="btn btn-primary update">Update</button>
//             </div>
//         </div>
//     </div>
// </div>`

let modal = `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" class="form-control" placeholder="Enter your updated task">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary cancel"
                                data-bs-dismiss="modal cancel">Cancel</button>
                            <button type="button" class="btn btn-primary update">Update</button>
                        </div>
                    </div>
                </div>
            </div>`

let arrTasks = [];
// localStorage.clear()
if (localStorage.getItem('tasks')) {
    arrTasks = JSON.parse(localStorage.getItem('tasks'));
}

getDataFromLS();

function takeInput() {
    if (inputTask.value != '') {
        addTaskToList(inputTask.value);
        showNote(`${inputTask.value} is Added Successfully`);
    }
    inputTask.value = '';
}

addBtn.addEventListener('click', takeInput);
inputTask.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        takeInput();
    }
})

function addTaskToList(text) {
    // task data
    let task = {
        id: Date.now(),
        title: text,
        done: false
    };
    // push task to global array 
    arrTasks.push(task);
    // add task to tasks div in page
    addTasksToPage(arrTasks);
    // add to localStorage
    addToLocalStorage(arrTasks);
    // show notification

}

function addTasksToPage(arrTasks) {
    // tasks.style.css.border = '1px solid rgba(0, 0, 0, 0.1)';
    console.log(tasks)
    if (arrTasks.length === 0) {
        tasks.style.border = 'none'
    } else {
        tasks.style.border = '1px solid rgba(0, 0, 0, 0.1)'
    }
    // tasks.style.backgroundColor = 'red'
    tasks.innerHTML = '';
    arrTasks.forEach((t) => {
        // create task div
        let task = document.createElement('div');
        task.classList.add('task');
        task.setAttribute('data-id', t.id);
        // check if task is done
        if (t.done) {
            task.classList.add('done');
            // add check empty icon
            task.innerHTML = `<i class="fa-solid fa-square-check check"></i>`
        } else {
            // add checked icon
            task.innerHTML = `<i class="fa-regular fa-square check"></i>`
        }
        // create p in task contain text of task
        let p = document.createElement('p');
        p.className = 'task-title';
        p.innerHTML = t.title;
        task.appendChild(p);
        // let text = document.createTextNode(t.title);
        // task.appendChild(text);

        // add update icon, its modal and delete icon
        task.innerHTML += `
        <i class="fa-solid fa-pen-to-square edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
        ${modal}
        <i class="fa-solid fa-trash delete"></i>`
        tasks.appendChild(task);
    })
}

let taskId;
tasks.addEventListener("click", (e) => {
    // change the status of task
    if (e.target.classList.contains('check')) {
        // Toggle Completed For The Task
        toggleStatus(e.target.parentElement.getAttribute("data-id"));
        // Toggle Done Class
        e.target.parentElement.classList.toggle("done");
        // change check icon
        e.target.classList.toggle('fa-regular')
        e.target.classList.toggle('fa-square')
        e.target.classList.toggle('fa-solid')
        e.target.classList.toggle('fa-square-check')
    }

    // get the task-id to update it
    if (e.target.classList.contains('edit')) {
        taskId = e.target.parentElement.getAttribute('data-id');
    }

    // update modal
    if (e.target.classList.contains('update')) {
        let newValue = e.target.parentElement.parentElement.children[1].firstElementChild.value;
        if (newValue !== '') {
            // update title of task is updated in array
            for (let i = 0; i < arrTasks.length; i++) {
                if (arrTasks[i].id == taskId) {
                    arrTasks[i].title = newValue;
                }
            }
            // update title of task is updated in page
            for (let i = 0; i < tasks.children.length; i++) {
                if (tasks.children[i].getAttribute('data-id') === taskId) {
                    tasks.children[i].children[1].innerHTML = newValue;
                }
            }
            // clear input
            e.target.parentElement.parentElement.children[1].firstElementChild.value = '';
            showNote(`${newValue} is Updated Successfully`);
        }
    }
    if (e.target.classList.contains('cancel')) {
        e.target.parentElement.parentElement.children[1].firstElementChild.value = '';
    }

    //Delete Button
    if (e.target.classList.contains("delete")) {
        // get title of task will be deleted
        let titleDel;
        // remove task from the page
        e.target.parentElement.remove();
        // remove task from the array
        for (let i = 0; i < arrTasks.length; i++) {
            if (arrTasks[i].id == e.target.parentElement.getAttribute('data-id')) {
                titleDel = arrTasks[i].title;
                arrTasks.splice(i, 1);
                break;
            }
        }
        // delete border from tasks
        if (arrTasks.length === 0) {
            tasks.style.border = 'none';
        }
        showNote(`${titleDel} is Deleted Successfully`);
    }
    // update tasks in localStorage
    addToLocalStorage(arrTasks);
});


function toggleStatus(taskId) {
    for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i].id == taskId) {
            if (arrTasks[i].done) {
                arrTasks[i].done = false;
            } else {
                arrTasks[i].done = true;
            }
        }
    }
    addToLocalStorage(arrTasks)
}

// add tasks to localStorage
function addToLocalStorage(arrTasks) {
    window.localStorage.setItem('tasks', JSON.stringify(arrTasks));
}

function getDataFromLS() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        addTasksToPage(JSON.parse(data));
    }
}

// notifications
let notes = document.querySelector('.notes');
function showNote(msg) {
    let note = document.createElement('div')
    note.className = 'note bg-light';
    note.innerHTML = `
    <i class="fa-solid fa-square-check"></i>
    <span>${msg}</span>
    `
    notes.appendChild(note);
    setTimeout(() => {
        note.remove();
    }, 4000);
}