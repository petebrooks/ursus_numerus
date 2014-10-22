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
  var el = document.getElementById(element),
      $el = $(el),
      ctxt = el.getContext('2d'),
      text = $el.data('text'),
  // data defined in element -- defaults for titles
      percentW = $el.data('percentw') || 1,
      percentH = $el.data('percenth') || 0.1,
      paddingW = $el.data('paddingw') || 0.1,
      paddingH = $el.data('paddingh') || 0.8,
      lineHeight = $el.data('lineheight') || 60,
      color = $el.data('color') || '#ffffff',
  // width and height relative to window
      $window = $(window),
      w = $window.width() * percentW,
      h = $window.height() * percentH,
  // text baseline start
      x = w * paddingW,
      y = h * paddingH,
  // ratio for scaling on high-dpi displays
      ratio = PIXEL_RATIO;

  el.width = w * ratio;
  el.height = h * ratio;
  el.style.width = w + 'px';
  el.style.height = h + 'px';

  ctxt.font = "Bold 2.8rem 'Helvetica'";
  ctxt.fillStyle = color;
  ctxt.fillRect(0, 0, w, h);
  ctxt.globalCompositeOperation = 'destination-out';

  // console.log(element + ":");
  // console.log("     %w: " + percentW + ", %h: " + percentH);
  // console.log("     w: " + w + ", h: " + h);
  // console.log("     x: " + x + ", y: " + y);

  var maxWidth = w-(x*2);
  wrapText(ctxt, text, x, y, maxWidth, lineHeight);
  ctxt.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function renderTextArray(arr) {
  arr.forEach(function(id){
    renderText(id);
  })
}