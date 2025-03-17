var timeline = null;

function renderTimeline() {
    var container = document.getElementById('timeline');
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

    timeline = new vis.Timeline(container, tasks, groups, options);
}

renderTimeline();
