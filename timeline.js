var timeline = null;

function renderTimeline() {
    var container = document.getElementById('timeline');
    var options = {
        configure: true
        stack: true,
        editable: true,
        margin: { item: 10 },
        showCurrentTime: true,
        showWeekScale: true
        zoomable: true,
        locale: 'it'
    {
    timeAxis: {
      scale: 'day',
      step: 1
    },
    showWeekScale: true,
    format: {
      minorLabels: {day: 'DD/MMM'},
      majorLabels: {day: 'w'}
    }
  }
    };

    timeline = new vis.Timeline(container, tasks, groups, options);
}

renderTimeline();
