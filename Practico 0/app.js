//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Events Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);

//Functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    const completedBttn = document.createElement('button');
    completedBttn.classList.add('completed-btn');  
    completedBttn.innerHTML = '<i class = "fas fa-check"></i>';
    todoDiv.appendChild(completedBttn);

    const trashBttn = document.createElement('button');
    trashBttn.classList.add('trash-btn');  
    trashBttn.innerHTML = '<i class = "fas fa-trash"></i>';
    todoDiv.appendChild(trashBttn);

    todoList.appendChild(todoDiv);

    todoInput.value = '';

}

function deleteOrCheck(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.remove();
    }

    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}
