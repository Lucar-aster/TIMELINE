function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('I task sono stati salvati!');
}

function loadTasks() {
    var loadedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (loadedTasks && Array.isArray(loadedTasks)) {
        tasks = loadedTasks;
        renderTimeline();
    } else {
        alert('Nessun task salvato o formato errato.');
    }
}

document.getElementById('saveTasks').addEventListener('click', saveTasks);
document.getElementById('loadTasks').addEventListener('click', loadTasks);
