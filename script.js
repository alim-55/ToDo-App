const TODO_ITEM_CLASS = 'todo-item';
const DELETE_BTN_CLASS = 'delete';
const EDIT_BTN_CLASS = 'edit';
const CHECKED_CLASS = 'checked';
const SUCCESS_MSG = '<i class="fa-solid fa-circle-check"></i>Task added successfully';
const ERROR_MSG = '<i class="fa-solid fa-circle-xmark"></i>Empty Task';

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
        li.classList.add(CHECKED_CLASS);
    }

    const deleteBtn = createButton(DELETE_BTN_CLASS, '<i class="fas fa-trash-alt"></i>', () => {
        deleteTodo(todo.id); // Use unique identifier for deletion
    });

    const editBtn = createButton(EDIT_BTN_CLASS, '<i class="fas fa-edit"></i>', (event) => {
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
        toast = createToast(ERROR_MSG, 'error');
    } else {
        toast = createToast(SUCCESS_MSG, 'success');
        const newTodo = { id: Date.now(), value: todoValue, checked: false }; // Generate unique identifier
        todos.push(newTodo);
        todoInput.value = '';
        saveToLocalStorage();
    }

    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000);
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
    todos = todos.filter(todo => todo.id !== id); // Filter out the todo with the specified id
    saveToLocalStorage();
    renderTodos();
}

function editTodo(id) {
    const todoToUpdate = todos.find(todo => todo.id === id); // Find the todo with the specified id
    if (todoToUpdate) {
        const newTodoValue = prompt("Edit your task", todoToUpdate.value);
        if (newTodoValue !== null && newTodoValue.trim() !== "") {
            todoToUpdate.value = newTodoValue.trim();
            saveToLocalStorage();
            renderTodos();
        }
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
    todos = [];
    saveToLocalStorage();
    renderTodos();
}
