// UI Variables
const form = document.querySelector('#task-list');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('.filter');
const taskInput = document.querySelector('.inputTasks');
const success = document.querySelector('.alert-success');
const danger = document.querySelector('.alert-danger');
const remove = document.querySelector('.task-remove');
const tasksClear = document.querySelector('.task-clear');

// Load EventListener 
loadEventListeners();

// Load all event listeners 
function loadEventListeners() {
    // DOM Load event 
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event 
    form.addEventListener('submit', addTask);
    // Remove task event 
    taskList.addEventListener('click', removeTask);
    // Clear task Events 
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Ls 
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
         
    }

    tasks.forEach(function(task){
         // Create li element
        const li = document.createElement('li');
        
        // Add class 
        li.className = 'collection-item';

        // create text node and append to li 
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class = "fa fa-remove"></i>';

        li.appendChild(link);

        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        danger.style.display = 'block';
        setTimeout(function(){
           danger.style.display = 'none';
        }, 3000);
        

    }
    else {
        success.style.display = 'block';
        setTimeout(function(){
           success.style.display = 'none';
        }, 3000);
        
        // Create li element
        const li = document.createElement('li');
        
        // Add class 
        li.className = 'collection-item';

        // create text node and append to li 
        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class = "fa fa-remove"></i>';

        li.appendChild(link);

        taskList.appendChild(li);

        // Store in Local Storage 
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}

// Store Task 
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
         
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task 
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item'))  {
        if(confirm('Are you Sure ?')) {
            remove.style.display = 'block';
        setTimeout(function(){
           remove.style.display = 'none';
        }, 3000);
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        
    }
}

// Remove from Ls 
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
         
    }
    tasks.forEach(function(task , index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    tasksClear.style.display = 'block';
        setTimeout(function(){
           tasksClear.style.display = 'none';
        }, 3000);
    // Slower
    // taskList.innerHTML = ''; 

    // Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

// Clear Tasks from Ls 
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
           const item = task.firstChild.textContent;
           if(item.toLowerCase().indexOf(text) != -1) {
               task.style.display = 'block';
           }
           else {
               task.style.display = 'none';
           }
    }); 
}
