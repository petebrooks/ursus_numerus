var txtIds = ['introTitle', 'secondTitle'];

$(document).ready(function() {
  drawText('introTitle', 150, 150, 50, '#ffffff');
  drawText('secondTitle', 150, 150, 50, '#ffffff');
  $(window).resize(function(event) {
    drawText('introTitle', 150, 150, 50, '#ffffff');
  });
});

function drawAllTxt() {
  
}