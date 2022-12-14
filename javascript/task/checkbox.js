export default function createCheckbox(task) {
    const input = document.createElement('input');
    input.id = task.id;
    input.type = 'checkbox';
    input.className = 'done-or-not';
    input.ariaLabel = 'Completed task: ' + task.description;
    input.checked = !task.isActive;
    return input;
}