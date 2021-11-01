//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const fullscreenBtn = document.querySelector('.fullscreen');

// Obj
let root = document.querySelector(":root");
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
    tareas.splice(0, tareas.length);
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
    id = tareas.length === 0 ? 0 : tareas[tareas.length - 1].id + 1;

    const todoLi = document.createElement('li');

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.id = id;

    const completedBttn = document.createElement('button');
    completedBttn.classList.add('completed-btn');
    completedBttn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedBttn);

    value = todoInput.value;
    const newTodo = document.createElement('p');
    newTodo.classList.add('todo-item');
    newTodo.innerText = value;
    todoDiv.appendChild(newTodo);

    const botones = document.createElement('div');
    botones.classList.add('botones');

    const copyBttn = document.createElement('button');
    copyBttn.classList.add('copy-btn');
    copyBttn.innerHTML = '<i class="far fa-copy"></i>';
    botones.appendChild(copyBttn);

    const shareBttn = document.createElement('button');
    shareBttn.classList.add('share-btn');
    shareBttn.innerHTML = '<i class="far fa-share-square"></i>';
    botones.appendChild(shareBttn);

    const trashBttn = document.createElement('button');
    trashBttn.classList.add('trash-btn');
    trashBttn.innerHTML = '<i class = "fas fa-trash"></i>';
    botones.appendChild(trashBttn);

    todoDiv.appendChild(botones);
    todoLi.appendChild(todoDiv);
    todoList.appendChild(todoLi);

    tareas.push({
        id: id,
        texto: todoInput.value,
        completado: false,
        geo: { "latitud": geo.latitud, "longitud": geo.longitud },
    })

    storageUpdate();

    todoInput.value = null;
    value = null;
}

function deleteOrCheck(e) {
    const item = e.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement.parentElement;
        const li = todo.parentElement;
        for (var i = 0; i < tareas.length; i++) {
            if (tareas[i].id == todo.id) {
                tareas.splice(i, 1);
            }
        }
        storageUpdate();
        li.remove();
    }

    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
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
    const todo = item.parentElement.parentElement;
    
    if (item.classList[0] === 'copy-btn') {
        const content = todo.children[1].innerText;
        navigator.clipboard.writeText(content).then(
            () => window.alert('Tarea Copiada: \n' + content)
        );
    }

    if (item.classList[0] === 'share-btn') {
        const content = todo.children[1].innerText;
        navigator.share({
            title: "Mi tarea",
            text: content,
            url: document.URL,
        });
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
    if(newColorScheme === 'dark'){
        root.setAttribute("class", "dark-scheme")
        root.style.setProperty('--primary', '#222222');
        root.style.setProperty('--secondary', '#FFFFFF33');
        root.style.setProperty('--text', '#FFFFFF');
    }else{
        root.setAttribute("class", "light-scheme")
        root.style.setProperty('--primary', '#FFFFFF');
        root.style.setProperty('--secondary', '#FFFFFF33');
        root.style.setProperty('--text', '#222222');
    }
});

window.onload = function () {

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.setAttribute("class", "dark-scheme")
        root.style.setProperty('--primary', '#222222');
        root.style.setProperty('--secondary', '#FFFFFF33');
        root.style.setProperty('--text', '#FFFFFF');
    }else{
        root.setAttribute("class", "light-scheme")
        root.style.setProperty('--primary', '#FFFFFF');
        root.style.setProperty('--secondary', '#2222221A');
        root.style.setProperty('--text', '#222222');
    }

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((location) => {
            geo.latitud = location.coords.latitude;
            geo.longitud = location.coords.longitude;
        });
    }

    tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    console.log(tareas);
    tareas.map((tarea) => {
        const todo = document.createElement("li");
        todo.innerHTML =
            `
            
            <div class="todo ${tarea.completado ? 'completed' : ''}" id="${tarea.id}">
            <button class="completed-btn">
                <i class="fas fa-check"></i>
            </button>
            <p class="todo-item">${tarea.texto}</p>
            <div class="botones">
                <button class="copy-btn"><i class="far fa-copy"></i></button>
                <button class="share-btn"><i class="far fa-share-square"></i></button>
                <button class="trash-btn"><i class="fas fa-trash"></i></button>
            </div>
            </div>
            `;
        todoList.appendChild(todo);
    })
}