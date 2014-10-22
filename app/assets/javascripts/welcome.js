var txtIds = ['introTitle', 'secondTitle'];

$(document).ready(function() {
  renderTextArray(txtIds);
  $(window).resize(function(event) {
    renderTextArray(txtIds);
  });
});