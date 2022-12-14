import store from "./store";
import createLi from "./task/task";

const todoSpace = document.querySelector('.task-list');
const selectAll = document.querySelector('.select-all-todos-button');
const tasksLeft = document.querySelector('.tasks-left');
const clearCompleted = document.querySelector('.clear-completed');
const ul = document.querySelector('.task-list');
const form = document.querySelector('.top-menu');
const filterOptionsRadio = document.querySelector('.task-selection');
const displayMode = {
    ALL: "All",
    ACTIVE: "Active",
    COMPLETED: "Completed"
}

export let currentDisplayMode = displayMode.ALL;

form.addEventListener('submit', addTask);
selectAll.addEventListener('click', store.selectAllTasks);
clearCompleted.addEventListener('click', deleteAllDone)
todoSpace.addEventListener('click', onClickAction);
filterOptionsRadio.addEventListener('click', store.changeFilterOption);

function addTask(e) {
    e.preventDefault();
    if (this.description.value.length === 0) {
        return;
    }
    const newTask = createTask(this.description.value);
    store.add(newTask);
    const task = createLi(newTask);
    ul.appendChild(task);
    this.reset();
}

function createTask(description) {
    return {
        id: Date.now(),
        description: description,
        isActive: true
    }
}

function onClickAction(e) {
    const className = e.target.className;
    const li = e.target.parentNode.parentNode;
    switch (className) {
        case 'delete-todo':
            deleteTask(li);
            e.target.parentElement.remove();
            break;
        case 'done-or-not':
            store.changeStatus(li.parentNode);
            break;
    }
}

function deleteTask(task) {
    store.remove(task.id);
    task.remove();
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

export default function filterByDisplayMode(curDisplayMode) {
    currentDisplayMode = curDisplayMode;
    todoSpace.innerHTML = '';
    for (let task of store.getList()) {
        if (filter(task)) {
            ul.appendChild(createLi(task));
        }
    }
}

function deleteAllDone() {
    store.clearCompleted();
}

function refreshCounter() {
    let count = store.getList().filter(task => filter(task)).length;
    tasksLeft.innerHTML = count + " items left";
}

store.subscribe(code => {
    switch (code) {
        case 0:
            refreshCounter();
            break;
        case 1:
            store.changeFilterOption()
            break;
        case 2:
            store.changeFilterOption();
            refreshCounter();
    }
});