export default function createDeleteButton(task) {
    const button = document.createElement('input');
    button.type = 'button';
    button.className = 'delete-todo';
    button.title = 'Delete task: ' + task.description;
    return button;
}