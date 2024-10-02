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

getData();

function takeInput() {
    if (inputTask.value != '') {
        addTaskToList(inputTask.value);
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
}

function addTasksToPage(arrTasks) {
    tasks.innerHTML = '';
    arrTasks.forEach((t) => {
        // create task div
        let task = document.createElement('div');
        task.className = 'task';
        // check if task is done
        if (t.done) {
            task.className = 'task done';
        }
        task.setAttribute('data-id', t.id);
        // add check icon
        if (t.done) {
            task.innerHTML = `<i class="fa-solid fa-square-check check"></i>`
        } else {
            task.innerHTML = `<i class="fa-regular fa-square check"></i>`
        }
        // create p in task contain text of task
        let p = document.createElement('p');
        p.innerHTML = t.title;
        task.appendChild(p);
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
    // get the task id to updated
    if (e.target.classList.contains('edit')) {
        taskId = e.target.parentElement.getAttribute('data-id');
    }

    // change the status of task
    if (e.target.classList.contains('check')) {
        // Toggle Completed For The Task
        toggleStatus(e.target.parentElement.getAttribute("data-id"));
        // Toggle Done Class
        e.target.parentElement.classList.toggle("done");
        // change check icon
        e.target.parentElement.firstElementChild.classList.toggle('fa-regular')
        e.target.parentElement.firstElementChild.classList.toggle('fa-square')
        e.target.parentElement.firstElementChild.classList.toggle('fa-solid')
        e.target.parentElement.firstElementChild.classList.toggle('fa-square-check')
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
        }
        console.log(arrTasks)
        addToLocalStorage(arrTasks);
    }
    if (e.target.classList.contains('cancel')) {
        e.target.parentElement.parentElement.children[1].firstElementChild.value = '';
    }

    //Delete Button
    if (e.target.classList.contains("delete")) {
        // remove task from the page
        e.target.parentElement.remove();
        // remove task from the array
        for (let i = 0; i < arrTasks.length; i++) {
            if (arrTasks[i].id == e.target.parentElement.getAttribute('data-id')) {
                arrTasks.splice(i, 1);
                break;
            }
        }
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

function getData() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        addTasksToPage(JSON.parse(data));
    }
}