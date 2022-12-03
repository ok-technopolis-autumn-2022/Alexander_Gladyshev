const todoSpace = document.querySelector('.task-list');
const selectAll = document.querySelector('.select-all-todos-button');
const tasksLeft = document.querySelector('.tasks-left');
const clearCompleted = document.querySelector('.clear-completed');
const ul = document.querySelector('.task-list');
const form = document.querySelector('.top-menu');
const selectOptionsRadio = document.getElementsByName('selector');
const displayMode = {
    ALL: "All",
    ACTIVE: "Active",
    COMPLETED: "Completed"
}

let taskList = [];
let count = 0;

form.addEventListener('submit', addTask);
selectAll.addEventListener('click', selectAllTasks);
clearCompleted.addEventListener('click', deleteAllDone)
for (let option of selectOptionsRadio) {
    option.addEventListener('change', changeFilterOption);
}

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.description.value);
    ul.appendChild(createLi(task));
    taskList.push(task);
    count++;
    tasksLeft.innerHTML = String(count + " items left");
    this.reset();
}

function createTask(description) {
    return {
        id: Date.now(),
        description: description,
        isActive: true
    }
}

/**
 * @param task {{id: string | number, description: string}}
 * @return {HTMLLIElement | void}
 */
function createLi(task) {
    if (task.description.length === 0) {
        return;
    }

    const li = document.createElement('li');
    li.id = task.id;
    li.className = 'task-item';
    li.ariaLabel = 'todo task';


    const taskItemView = document.createElement('div');
    taskItemView.className = 'task-item_view';

    const label = document.createElement('label');
    label.className = 'task-item_label';
    label.htmlFor = task.id;

    const input = document.createElement('input');
    input.id = task.id;
    input.type = 'checkbox';
    input.className = 'done-or-not';
    input.ariaLabel = 'Completed task: ' + task.description;
    input.checked = !task.isActive;

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = task.description;

    const button = document.createElement('input');
    button.type = 'button';
    button.className = 'delete-todo';
    button.title = 'Delete task: ' + task.description;

    const deleteTask = () => {
        count--;
        taskList = taskList.filter(task => task.id !== Number(li.id));
        tasksLeft.innerHTML = String(count + " items left");
        button.removeEventListener('click', deleteTask)
        li.remove();
    }

    button.addEventListener('click', deleteTask)
    input.addEventListener('change', () => {
        for (let task of taskList) {
            if (task.id === Number(li.id)) {
                task.isActive = !task.isActive;
            }
            changeFilterOption();
        }
    })

    label.append(input, span);
    taskItemView.append(label, button);
    li.appendChild(taskItemView);
    return li;
}

function changeFilterOption() {
    for (let option of selectOptionsRadio) {
        if (option.checked) {
            todoSpace.innerHTML = '';
            count = 0;
            filterByDisplayMode(option.value);
        }
    }
}

function filter(task, currentDisplayMode) {
    if (currentDisplayMode === displayMode.ACTIVE) {
        return task.isActive;
    } else if (currentDisplayMode === displayMode.COMPLETED) {
        return !task.isActive;
    } else {
        return true;
    }
}

function filterByDisplayMode(currentDisplayMode) {
    for (let task of taskList) {
        if (filter(task, currentDisplayMode)) {
            ul.appendChild(createLi(task));
            count++;
        }
    }
    tasksLeft.innerHTML = String(count + " items left");
}

function selectAllTasks() {
    let allActive = true;
    taskList.forEach(task => {
        if (!task.isActive) {
            allActive = false;
        }
    })
    if (allActive) {
        for (let task of taskList) {
            task.isActive = false;
        }
    } else {
        for (let task of taskList) {
            task.isActive = true;
        }
    }
    changeFilterOption();
}

function deleteAllDone() {
    taskList = taskList.filter(task => task.isActive);
    changeFilterOption();
}