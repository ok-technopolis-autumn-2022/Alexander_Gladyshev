import createCheckbox from "./checkbox";
import createSpan from "./span";

export default function createLabel(task) {
    const label = document.createElement('label');
    label.className = 'task-item_label';
    label.htmlFor = task.id;

    const checkbox = createCheckbox(task);
    const span = createSpan(task);
    label.append(checkbox, span);
    return label;
}