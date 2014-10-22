var txtIds = ['introTitle', 'secondTitle', 'nextTitle'];

$(document).ready(function() {
  renderTextArray(txtIds);
  $(window).resize(function(event) {
    renderTextArray(txtIds);
  });
});