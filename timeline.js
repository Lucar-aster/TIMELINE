var timeline = null;

function renderTimeline() {
    var container = document.getElementById('timeline');
    var options = {
        stack: true,
        editable: true,
        margin: { item: 10 },
        showCurrentTime: true,
        zoomable: true,
        locale: 'it'
    };

    timeline = new vis.Timeline(container, tasks, groups, options);
}

renderTimeline();
