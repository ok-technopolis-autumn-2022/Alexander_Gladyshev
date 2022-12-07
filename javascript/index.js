const todoSpace = document.querySelector('.task-list');
const selectAll = document.querySelector('.select-all-todos-button');
const tasksLeft = document.querySelector('.tasks-left');
const clearCompleted = document.querySelector('.clear-completed');
const ul = document.querySelector('.task-list');
const form = document.querySelector('.top-menu');
const filterOptionsRadio = document.querySelector('.task-selection');
const filterOptionsList = document.getElementsByName('selector');
const displayMode = {
    ALL: "All",
    ACTIVE: "Active",
    COMPLETED: "Completed"
}

let taskList = [];
let currentDisplayMode = displayMode.ALL;

form.addEventListener('submit', addTask);
selectAll.addEventListener('click', selectAllTasks);
clearCompleted.addEventListener('click', deleteAllDone)
todoSpace.addEventListener('click', onClickAction);
filterOptionsRadio.addEventListener('click', changeFilterOption);

function addTask(e) {
    e.preventDefault();
    if (this.description.value.length === 0) {
        return;
    }
    const task = createTask(this.description.value);
    ul.appendChild(createLi(task));
    taskList.push(task);
    refreshCounter();
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
 * @param task {{id: string | number, description: string, isActive: boolean}}
 * @return {HTMLLIElement | void}
 */
function createLi(task) {
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

    label.append(input, span);
    taskItemView.append(label, button);
    li.appendChild(taskItemView);
    return li;
}

function onClickAction(e) {
    const className = e.target.className;
    const li = e.target.parentNode.parentNode.parentNode;
    switch (className) {
        case 'delete-todo':
            deleteTask(li);
            e.target.parentElement.remove();
            break;
        case 'done-or-not':
            changeStatus(li);
            changeFilterOption();
            break;
    }
}

function deleteTask(li) {
    taskList = taskList.filter(task => task.id !== Number(li.id));
    refreshCounter();
    li.remove();
}

function changeStatus(li) {
    let tsk = getTaskById(li);
    tsk.isActive = !tsk.isActive;
    changeFilterOption();
}

function getTaskById(li) {
    for (let task of taskList) {
        if (task.id === Number(li.id)) {
            return task;
        }
    }
    return null;
}

function changeFilterOption() {
    for (let option of filterOptionsList) {
        if (option.checked) {
            todoSpace.innerHTML = '';
            currentDisplayMode = option.value;
            filterByDisplayMode();
        }
    }
}

function filter(task) {
    if (currentDisplayMode === displayMode.ACTIVE) {
        return task.isActive;
    } else if (currentDisplayMode === displayMode.COMPLETED) {
        return !task.isActive;
    } else {
        return true;
    }
}

function filterByDisplayMode() {
    for (let task of taskList) {
        if (filter(task, currentDisplayMode)) {
            ul.appendChild(createLi(task));
        }
    }
    refreshCounter();
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

function refreshCounter() {
    let count = taskList.filter(task => filter(task)).length;
    tasksLeft.innerHTML = count + " items left";
}