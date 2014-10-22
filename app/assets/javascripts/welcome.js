var txtIds = ['introTitle', 'projectsTitle', 'backgroundTitle', 'contactTitle'];

$(document).ready(function() {
  renderTextArray(txtIds);
  $(window).resize(function(event) {
    renderTextArray(txtIds);
  });
});