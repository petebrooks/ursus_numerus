var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var c = document.createElement("canvas");
    c.width = w * ratio;
    c.height = h * ratio;
    c.style.width = w + "px";
    c.style.height = h + "px";
    c.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return c;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";
  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if(testWidth > maxWidth) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

function renderText(element) {
  var el = document.getElementById(element);
  var ctxt = el.getContext('2d');
  var text = $el.data('text');

  var winW = $(window).width() * percentH;
  var winH = $(window).height() * percentW;

  var lineHeight = 60;
  var color = '#ffffff';
  var x = winW * .2, y = x;

  var ratio = PIXEL_RATIO;

  el.width = winW * ratio;
  el.height = winH * ratio;
  el.style.width = winW + 'px';
  el.style.height = winH + 'px';

  ctxt.font = "Bold 2.8rem 'Helvetica'";
  ctxt.fillStyle = color;
  ctxt.fillRect(0, 0, winW, winH);
  ctxt.globalCompositeOperation = 'destination-out';

  var maxWidth = winW-(x*2);
  wrapText(ctxt, text, x, y, maxWidth, lineHeight);
  ctxt.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function renderTextArray(arr) {
  arr.forEach(function(id){
    renderText(id);
  })
}