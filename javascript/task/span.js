export default function createSpan(task) {
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = task.description;
    return span;
}