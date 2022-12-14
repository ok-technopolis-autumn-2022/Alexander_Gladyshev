import createLabel from "./label";
import createDeleteButton from "./delButton";

/**
 * @param task {{id: string | number, description: string, isActive: boolean}}
 * @return {HTMLLIElement | void}
 */
export default function createLi(task) {
    const li = document.createElement('li');
    li.id = task.id;
    li.className = 'task-item';
    li.ariaLabel = 'todo task';

    const taskItemView = document.createElement('div');
    taskItemView.className = 'task-item_view';

    const label = createLabel(task);
    const delButton = createDeleteButton(task);

    taskItemView.append(label, delButton);
    li.appendChild(taskItemView);
    return li;
}
