var timeline = null;

function renderTimeline() {
    var container = document.getElementById('timeline');

    
    if (!container) {
        console.error("Elemento 'timeline' non trovato nel DOM.");
        return;
    }
    
     var options = {
        stack: true,
        editable: true,
        margin: { item: 10 },
        showCurrentTime: true,
        zoomable: true,
        locale: 'it',
        showWeekScale: true,
        timeAxis: { scale: 'day', step: 1, position: 'top' },
         
        format: { minorLabels: { day: 'DD/MMM' }, majorLabels: { day: 'w' } }
    };
    
// Verifica che tasks e groups siano definiti prima di usarli    
 if (typeof tasks === 'undefined' || typeof groups === 'undefined') {
        console.error("Errore: tasks o groups non sono definiti. Assicurati che data.js sia caricato.");
        return;
     
    timeline = new vis.Timeline(container, tasks, groups, options);
}
// Aspetta il caricamento del DOM prima di eseguire la funzione
document.addEventListener("DOMContentLoaded", renderTimeline);

