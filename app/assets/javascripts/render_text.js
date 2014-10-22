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
  var $el = $(el);
  var ctxt = el.getContext('2d');
  var text = $el.data('text');

  var percentW = $el.data('percentw') || 1;
  var percentH = $el.data('percenth') || 1;
  var paddingW = $el.data('paddingw') || 0.2;
  var paddingH = $el.data('paddingh') || 0.3;

  var w = $(window).width() * percentW;
  var h = $(window).height() * percentH;

  var lineHeight = 60;
  var color = '#ffffff';
  var x = w * paddingW, y = h * paddingH;
  // var x = 15, y = x;

  console.log(element + ":");
  console.log("     %w: " + percentW + ", %h: " + percentH);
  console.log("     w: " + w + ", h: " + h);
  console.log("     x: " + x + ", y: " + y);

  var ratio = PIXEL_RATIO;

  el.width = w * ratio;
  el.height = h * ratio;
  el.style.width = w + 'px';
  el.style.height = h + 'px';

  ctxt.font = "Bold 2.8rem 'Helvetica'";
  ctxt.fillStyle = color;
  ctxt.fillRect(0, 0, w, h);
  ctxt.globalCompositeOperation = 'destination-out';

  var maxWidth = w-(x*2);
  wrapText(ctxt, text, x, y, maxWidth, lineHeight);
  ctxt.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function renderTextArray(arr) {
  arr.forEach(function(id){
    renderText(id);
  })
}