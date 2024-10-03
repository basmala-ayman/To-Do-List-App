let inputTask = document.getElementById('input-task');
let addBtn = document.getElementById('add');
let tasks = document.querySelector('.app .tasks');

let modal = `
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Update</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input id='new-title' type="text" class="form-control" autofocus placeholder="Enter your updated task">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary cancel" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary update">Update</button>
            </div>
        </div>
    </div>
</div>`

let arrTasks = [];

// check if there is data in localStorage
if (localStorage.getItem('tasks')) {
    // if yes get data from localStorage to array and page
    arrTasks = JSON.parse(localStorage.getItem('tasks'));
    addTasksToPage(arrTasks);
}

// take task from input box
function takeInput() {
    if (inputTask.value != '') {
        addTaskToList(inputTask.value);
        showNote(`${inputTask.value} is Added Successfully`);
    }
    inputTask.value = '';
}

// add task when user clicks on Add button
addBtn.addEventListener('click', takeInput);
// add task when user presses enter
inputTask.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        takeInput();
    }
})

// store tasks as objects in an array
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

// print tasks in our page
function addTasksToPage(arrTasks) {
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
        p.innerHTML = t.title;
        task.appendChild(p);

        // add update icon, its modal and delete icon
        task.innerHTML += `
        <i class="fa-solid fa-pen-to-square edit" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        ${modal}
        <i class="fa-solid fa-trash delete text-danger"></i>`
        tasks.appendChild(task);
    })
}

// task functionalities such as: check as done, edit and delete tasks
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
        let inputBox = document.getElementById('new-title');
        inputBox.value = e.target.parentElement.children[1].innerHTML;
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
    // when user click cancel it will clear the input box
    if (e.target.classList.contains('cancel')) {
        e.target.parentElement.parentElement.children[1].firstElementChild.value = '';
    }

    //Delete Button
    if (e.target.classList.contains("delete")) {
        let delTask = e.target.parentElement
        // get title of task will be deleted
        let titleDel;
        // Add transition
        delTask.classList.add('fade-out');
        setTimeout(() => {
            // remove task from the page
            delTask.remove();
            // remove task from the array
            arrTasks = arrTasks.filter((task) => task.id != delTask.getAttribute('data-id'));
            // delete border from tasks if all tasks were deleted
            if (arrTasks.length === 0) {
                tasks.style.border = 'none';
            }
            // update tasks in localStorage
            addToLocalStorage(arrTasks);
            showNote(`${titleDel} is Deleted Successfully`);
        }, 400);
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