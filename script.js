const TODO_ITEM_CLASS = 'todo-item';
const delete_btn = 'delete';
const edit_btn = 'edit';
const checked_class = 'checked';
const success_msg = '<i class="fa-solid fa-circle-check"></i>Task added successfully';
const error_msg = '<i class="fa-solid fa-circle-xmark"></i>Empty Task';
const delete_all_msg = '<i class="fa-solid fa-trash"></i>All task deleted';
const task_delete = '<i class="fa-solid fa-trash"></i>Task Deleted';

const form = document.getElementById("todoform");
const todoInput = document.getElementById("content");
const todoListElement = document.getElementById("list-container");
const toastBox = document.getElementById('toastBox');
const deleteAllBtn = document.querySelector('.delete-all');

deleteAllBtn.addEventListener('click', deleteAllTodos);

let todos = [];

document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    renderTodos();
});

function createTodoItem(todo) {
    const li = document.createElement('li');
    li.textContent = todo.value;
    li.setAttribute('data-id', todo.id); // Add unique identifier

    if (todo.checked) {
        li.classList.add(checked_class);
    }

    const deleteBtn = createButton(delete_btn, '<i class="fas fa-trash-alt"></i>', () => {
        deleteTodo(todo.id); // Use unique identifier for deletion
    });

    const editBtn = createButton(edit_btn, '<i class="fas fa-edit"></i>', (event) => {
        event.stopPropagation();
        editTodo(todo.id); // Use unique identifier for editing
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    li.addEventListener('click', () => {
        toggleCheck(todo.id); // Use unique identifier for toggling
    });

    return li;
}

function createButton(className, innerHTML, onClick) {
    const btn = document.createElement("span");
    btn.innerHTML = innerHTML;
    btn.classList.add(className);
    btn.addEventListener('click', onClick);
    return btn;
}

function renderTodos() {
    todoListElement.innerHTML = ''; // Clear the current list

    todos.forEach(todo => {
        todoListElement.appendChild(createTodoItem(todo));
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveTodo();
    renderTodos();
});

function saveTodo() {
    const todoValue = todoInput.value;
    let toast;

    if (todoValue === '') {
        toast = createToast(error_msg, 'error');
    } else {
        toast = createToast(success_msg, 'success');
        const newTodo = { id: Date.now(), value: todoValue, checked: false }; // Generate unique identifier
        todos.push(newTodo);
        todoInput.value = '';
        saveToLocalStorage();
    }

    // Append the toast and set a timeout to remove it
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000); // Remove after 2 seconds
}

function createToast(message, className) {
    const toast = document.createElement('div');
    toast.classList.add('toast', className);
    toast.innerHTML = message;
    return toast;
}

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(id) {
    let toast;
    toast = createToast(task_delete, 'error');
    todos = todos.filter(todo => todo.id !== id); // Filter out the todo with the specified id
    saveToLocalStorage();
    renderTodos();
    // Append the toast and set a timeout to remove it
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000); // Remove after 2 seconds
}

function editTodo(id) {
    const todoToUpdate = todos.find(todo => todo.id === id);
    const li = document.querySelector(`li[data-id="${id}"]`);

    if (todoToUpdate && li) {
        const input = document.createElement('input');
        input.value = todoToUpdate.value;

        input.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                todoToUpdate.value = input.value.trim();
                saveToLocalStorage();
                renderTodos();
            }
        });

        input.addEventListener('focusout', function () {
            todoToUpdate.value = input.value.trim();
            saveToLocalStorage();
            renderTodos();
        });

        li.textContent = ''; 
        li.appendChild(input);
        input.focus(); // Focus on the input field
    }
}

function toggleCheck(id) {
    const todoToUpdate = todos.find(todo => todo.id === id); // Find the todo with the specified id
    if (todoToUpdate) {
        todoToUpdate.checked = !todoToUpdate.checked;
        saveToLocalStorage();
        renderTodos();
    }
}

function deleteAllTodos() {
    let toast;
    toast = createToast(delete_all_msg, 'error');

    todos = [];
    saveToLocalStorage();
    renderTodos();

    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000); // Remove after 2 seconds
}






