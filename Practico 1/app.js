//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const fullscreenBtn = document.querySelector('.fullscreen');

//Events Listeners
todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteOrCheck);
todoList.addEventListener('click', copyOrShare);

fullscreenBtn.addEventListener("click", fullscreen);

//Functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    const shareBttn = document.createElement('button');
    shareBttn.classList.add('share-btn');
    shareBttn.innerHTML = '<i class="far fa-share-square"></i>';
    todoDiv.appendChild(shareBttn);
    
    const copyBttn = document.createElement('button');
    copyBttn.classList.add('copy-btn');
    copyBttn.innerHTML = '<i class="far fa-copy"></i>';
    todoDiv.appendChild(copyBttn);

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

function fullscreen(e) {
    if(!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-compress fa-lg"></i>';
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-expand fa-lg"></i>';
    }
}

function copyOrShare(e) {
    const item = e.target;
    
    if (item.classList[0] === 'copy-btn') {
        const todo = item.parentElement;
        navigator.clipboard.writeText(todo.children[0].innerText).then(
            () => window.alert('Tarea Copiada')
        );
    }
    
    if (item.classList[0] === 'share-btn') {
        const todoContent = item.parentElement.children[0].innerText;
        navigator.share({
            title: "Mi tarea",
            text: todoContent,
            url: document.URL,
        });
    }
}
