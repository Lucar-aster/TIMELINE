// Carica il pacchetto di Google Charts per la timeline
google.charts.load('current', {'packages':['timeline']});

let tasks = []; // Array per memorizzare i task

// Funzione per aggiungere un task principale
document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const commessa = prompt('Inserisci il nome della commessa');
    const operatore = prompt('Inserisci il nome dell\'operatore');
    const inizioProgramma = prompt('Inserisci la data di inizio programma (YYYY-MM-DD)');
    const fineProgramma = prompt('Inserisci la data di fine programma (YYYY-MM-DD)');
    const inizioLavoro = prompt('Inserisci la data di inizio lavoro (YYYY-MM-DD)');
    const fineLavoro = prompt('Inserisci la data di fine lavoro (YYYY-MM-DD)');

    const task = {
        commessa,
        operatore,
        inizioProgramma,
        fineProgramma,
        inizioLavoro,
        fineLavoro,
        subTasks: [] // Array per i sub-task
    };

    tasks.push(task);
    renderTaskTable();
    renderTimeline();
}

// Funzione per aggiungere un sub-task a un task principale
function addSubTask(index) {
    const subTaskName = prompt('Inserisci il nome del sub-task');
    const inizioProgramma = prompt('Inserisci la data di inizio programma del sub-task (YYYY-MM-DD)');
    const fineProgramma = prompt('Inserisci la data di fine programma del sub-task (YYYY-MM-DD)');
    const inizioLavoro = prompt('Inserisci la data di inizio lavoro del sub-task (YYYY-MM-DD)');
    const fineLavoro = prompt('Inserisci la data di fine lavoro del sub-task (YYYY-MM-DD)');

    const subTask = {
        subTaskName,
        inizioProgramma,
        fineProgramma,
        inizioLavoro,
        fineLavoro
    };

    tasks[index].subTasks.push(subTask);
    updateMainTaskDates(index); // Ricalcola le date del task principale in base ai sub-task
    renderTaskTable();
    renderTimeline();
}

// Funzione per aggiornare dinamicamente le date del task principale in base ai sub-task
function updateMainTaskDates(index) {
    const task = tasks[index];
    let earliestStart = new Date(task.inizioProgramma);
    let latestEnd = new Date(task.fineProgramma);

    task.subTasks.forEach(subTask => {
        const subStart = new Date(subTask.inizioProgramma);
        const subEnd = new Date(subTask.fineProgramma);

        if (subStart < earliestStart) earliestStart = subStart;
        if (subEnd > latestEnd) latestEnd = subEnd;
    });

    task.inizioProgramma = earliestStart.toISOString().split('T')[0];
    task.fineProgramma = latestEnd.toISOString().split('T')[0];
}

// Funzione per rendere la tabella con i task e sub-task
function renderTaskTable() {
    const tbody = document.querySelector('#task-table tbody');
    tbody.innerHTML = ''; // Pulisce la tabella prima di renderizzare

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${task.commessa}</td>
            <td>${task.operatore}</td>
            <td>${task.inizioProgramma}</td>
            <td>${task.fineProgramma}</td>
            <td>${task.inizioLavoro}</td>
            <td>${task.fineLavoro}</td>
            <td>
                <button onclick="addSubTask(${index})">Aggiungi Sub-task</button>
                <button onclick="removeTask(${index})">Rimuovi Task</button>
            </td>
        `;

        tbody.appendChild(row);

        // Aggiungiamo i sub-task come righe aggiuntive
        task.subTasks.forEach(subTask => {
            const subRow = document.createElement('tr');
            subRow.classList.add('sub-task');
            subRow.innerHTML = `
                <td colspan="2">${subTask.subTaskName}</td>
                <td>${subTask.inizioProgramma}</td>
                <td>${subTask.fineProgramma}</td>
                <td>${subTask.inizioLavoro}</td>
                <td>${subTask.fineLavoro}</td>
                <td></td>
            `;
            tbody.appendChild(subRow);
        });
    });
}

// Funzione per rimuovere un task principale
function removeTask(index) {
    tasks.splice(index, 1);
    renderTaskTable();
    renderTimeline();
}

// Funzione per rendere la timeline utilizzando Google Charts
function renderTimeline() {
    const container = document.getElementById('timeline');
    const data = new google.visualization.DataTable();

    data.addColumn({ type: 'string', id: 'Task' });
    data.addColumn({ type: 'date', id: 'Start' });
    data.addColumn({ type: 'date', id: 'End' });

    // Aggiungiamo i task alla timeline
    tasks.forEach(task => {
        // Task principale
        data.addRow([task.commessa, new Date(task.inizioProgramma), new Date(task.fineProgramma)]);
        // Sub-task
        task.subTasks.forEach(subTask => {
            data.addRow([subTask.subTaskName, new Date(subTask.inizioProgramma), new Date(subTask.fineProgramma)]);
        });
    });

    const options = {
        timeline: { showBarLabels: true },
        avoidOverlappingGridLines: false,
        colors: ['#4CAF50', '#FF9800'] // Colori per le barre
    };

    const chart = new google.visualization.Timeline(container);
    chart.draw(data, options);
}

// Carica e disegna la timeline appena i dati sono pronti
google.charts.setOnLoadCallback(renderTimeline);
