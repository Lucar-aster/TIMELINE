var selectedTask = null;

document.getElementById('timeline').addEventListener('dblclick', function(event) {
    var itemId = event.target.dataset.id;
    if (itemId) {
        selectedTask = tasks.find(task => task.id == itemId);
        if (selectedTask) {
            document.getElementById('taskContent').value = selectedTask.content;
            document.getElementById('taskStart').value = selectedTask.start;
            document.getElementById('taskEnd').value = selectedTask.end;
            document.getElementById('taskColor').value = selectedTask.style.replace("background-color:", "").trim() || "#ffffff";
            document.getElementById('taskModal').style.display = "block";
        }
    }
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('taskModal').style.display = "none";
});
