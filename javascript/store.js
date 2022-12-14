import filterByDisplayMode from "./index.js";

const filterOptionsList = document.getElementsByName('selector');

export class Store {
    #tasks;
    #observers;

    constructor() {
        this.#tasks = [];
        this.#observers = [];
    }

    add(task) {
        this.#tasks.push(task);
        this.notify(0);
    }

    getList() {
        return this.#tasks;
    }

    /**
     * @param id {number}
     **/
    getById(id) {
        for (let task of this.#tasks) {
            if (task.id === Number(id)) {
                return task;
            }
        }
        return null;
    }

    /**
     * @param id {number}
     **/
    remove(id) {
        this.#tasks = this.#tasks.filter(task => task.id !== Number(id));
        this.notify(0);
    }

    clearCompleted() {
        this.#tasks = this.#tasks.filter(task => task.isActive);
        this.notify(2);
    }

    changeStatus(task) {
        let tsk = this.getById(task.id);
        tsk.isActive = !tsk.isActive;
        this.notify(2);
    }

    subscribe(observer) {
        this.#observers.push(observer);
        observer(this);
    }

    unsubscribe(observer) {
        this.#observers = this.#observers.filter(obs => obs !== observer)
    }

    notify(code) {
        this.#observers.forEach(observer => observer(code))
    }


    changeFilterOption = () => {
        for (let option of filterOptionsList) {
            if (option.checked) {
                filterByDisplayMode(option.value);
            }
        }
        this.notify(0);
    }

    selectAllTasks = () => {
        let allActive = true;
        this.getList().forEach(task => {
            if (!task.isActive) {
                allActive = false;
            }
        })
        if (allActive) {
            for (let task of store.getList()) {
                task.isActive = false;
            }
        } else {
            for (let task of store.getList()) {
                task.isActive = true;
            }
        }
        this.notify(2);
    }
}

const store = new Store();
export default store;