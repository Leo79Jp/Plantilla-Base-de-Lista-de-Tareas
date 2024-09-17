// Al cargar la página, queremos verificar si ya hay tareas guardadas en el localStorage
// Si es así, las cargamos en la lista. Esta función inicializa nuestra lista de tareas.

// const baseTareas = []

function loadTasksFromLocalStorage() {

    // Intentamos obtener las tareas guardadas como un string JSON
    const tareas = localStorage.getItem('tareas');
    if (tareas){
        const tarea = JSON.parse(tareas);
        tarea.forEach(tarea => {
            addTaskToDOM(tarea);
        });
        // Recorremos las tareas cargadas y las agregamos visualmente al <ul>
    }
}

// Esta función añade la tarea al DOM, es decir, la muestra en la lista de tareas en pantalla
function addTaskToDOM(taskText) {
    // Creamos un nuevo elemento <li> que contendrá el texto de la tarea
     const tareaItem = document.createElement('li');
     tareaItem.textContent = taskText;
    
    // Agregamos un botón de "eliminar" a cada tarea, para que el usuario pueda borrarla
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = "Eliminar";
    botonEliminar.setAttribute("class", "eliminarBoton")
    botonEliminar.addEventListener('click', () => {
        removeTask(taskText);
        tareaItem.remove();
    });
    // Al hacer clic en "eliminar", quitamos la tarea del DOM y del localStorage
    // Elimina la tarea de la interfaz
    tareaItem.appendChild(botonEliminar);

    // Agregamos el botón de eliminar al <li> de la tarea

    // Finalmente, agregamos la tarea a la lista visual en el <ul>
    const tareas = document.getElementById('taskList');
    tareas.appendChild(tareaItem);
}

// Esta función se encarga de guardar las tareas en el localStorage
function saveTaskToLocalStorage(taskText) {
    // Obtenemos las tareas guardadas en localStorage o creamos un array vacío si no hay tareas
    let tareas = localStorage.getItem('tareas');
    if (!tareas){
        tareas= [];

    }else{
        tareas = JSON.parse(tareas);
    }
    // Añadimos la nueva tarea al array
    tareas.push(taskText);
    // Guardamos el array actualizado en el localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Esta función borra una tarea específica del localStorage
function removeTask(taskText) {
    // Cargamos las tareas del localStorage
    let tareas = localStorage.getItem('tareas');

    // Filtramos el array para remover la tarea que coincide con el texto proporcionado
    tareas = JSON.parse(tareas).filter(tarea => tarea != taskText);
    // Guardamos el array actualizado sin la tarea eliminada
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Manejamos el clic del botón de agregar tarea
document.getElementById('addButton').addEventListener('click', () => {
    // Obtenemos el valor ingresado por el usuario
    const tareaInput = document.getElementById('taskInput');
    const taskText = tareaInput.value.trim();
    // 

    // Verificamos si el campo no está vacío
    if (taskText){
        // Agregamos la tarea al DOM y la guardamos en el localStorage
        addTaskToDOM(taskText);
        saveTaskToLocalStorage(taskText);
        // Limpiamos el campo de entrada después de agregar la tarea
        tareaInput.value = '';
    }
});

// Llamamos a esta función cuando la página se carga para inicializar la lista con tareas guardadas
loadTasksFromLocalStorage();
