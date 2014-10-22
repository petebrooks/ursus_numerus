var txtIds = ['introTitle', 'backgroundTitle', 'projectsTitle'];

$(document).ready(function() {
  renderTextArray(txtIds);
  $(window).resize(function(event) {
    renderTextArray(txtIds);
  });
});