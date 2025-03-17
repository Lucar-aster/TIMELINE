var timeline = null;

function renderTimeline() {
    var container = document.getElementById('timeline');
    var options = {
        stack: true,
        editable: true,
        groupEditable: true
        margin: { item: 10 },
        showCurrentTime: true,
        zoomable: true,
        locale: 'it',
       timeAxis: { scale: 'day', step: 1, position: 'top'},
        showWeekScale: true,
        format: { minorLabels: {day: 'DD/MMM'},majorLabels: {day: 'w'}},
    };

    timeline = new vis.Timeline(container, tasks, groups, options);

renderTimeline();
