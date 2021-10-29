//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const fullscreenBtn = document.querySelector('.fullscreen');

// Obj

let tareas = [];
let geo = { latitud: null, longitud: null };

//Events Listeners
todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteOrCheck);
todoList.addEventListener('click', copyOrShare);

fullscreenBtn.addEventListener("click", fullscreen);

//Functions

function storageUpdate() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function storageClean() {
    tareas.splice(0 , tareas.length);
}

function fullscreen(e) {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-compress fa-lg"></i>';
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-expand fa-lg"></i>';
    }
}

function addTodo(e) {
    e.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    value = todoInput.value;
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = value;
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

    id = tareas.length === 0 ? 0 : tareas[tareas.length - 1].id + 1;
    tareas.push({
        id: id,
        texto: todoInput.value,
        completado: false,
        geo: {"latitud": geo.latitud, "longitud": geo.longitud}, 
    })

    storageUpdate();

    todoInput.value = null;
    value = null;
}

function deleteOrCheck(e) {
    const item = e.target;
    const todo = item.parentElement;

    if (item.classList[0] === 'trash-btn') {
        for (var i = 0; i < tareas.length; i++) {
            if (tareas[i].id == todo.id) {
                tareas.splice(i, 1);
            }
        }
        storageUpdate();
        todo.remove();
    }

    if (item.classList[0] === 'completed-btn') {
        todo.classList.toggle('completed');
        for (var i = 0; i < tareas.length; i++) {
            if (tareas[i].id == todo.id) {
                tareas[i].completado = !tareas[i].completado;
            }
        }
        storageUpdate();
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

window.onload = function () {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((location) => {
            geo.latitud = location.coords.latitude;
            geo.longitud = location.coords.longitude;
        });
    }
    
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    console.log(tareas);
    tareas.map((tarea) => {
        const todo = document.createElement("div");
        todo.innerHTML =
            `
            <div class="todo ${tarea.completado ? 'completed' : ''}" id="${tarea.id}">
            <li class="todo-item">${tarea.texto}</li>
            <button class="share-btn"><i class="far fa-share-square"></i></button>
            <button class="copy-btn"><i class="far fa-copy"></i></button>
            <button class="completed-btn"><i class="fas fa-check"></i></button>
            <button class="trash-btn"><i class="fas fa-trash"></i></button>
            </div>
            `;
        todoList.appendChild(todo);
    })
}