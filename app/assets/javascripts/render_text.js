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

function wrapText(ctxt, text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";
  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = ctxt.measureText(testLine);
    var testWidth = metrics.width;
    if(testWidth > maxWidth) {
      ctxt.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctxt.fillText(line, x, y);
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
      w = $window.width() * percentW + 4,
      h = $window.height() * percentH + 4,
  // text baseline start
      x = w * paddingW,
      y = h * paddingH,
  // ratio for scaling on high-dpi displays
      ratio = PIXEL_RATIO,
  // max width for word wrap
      maxWidth = w-(x*2);

  if ($window.width() < 500) {
    lineHeight *= 0.7;
  };

  // scale for high dpi displays
  el.width = w * ratio;
  el.height = h * ratio;
  el.style.width = w * ratio + 'px';
  // el.style.width = $window.width() + 'px';
  el.style.height = h * ratio + 'px';
  // el.style.height = $window.height() + 'px';

  ctxt.font = "Bold 2.8rem 'Helvetica'";
  if($window.width() < 600) {
    ctxt.font = "Bold 1.9rem 'Helvetica'";
  }
  ctxt.fillStyle = color;
  ctxt.fillRect(0, 0, w, h);
  ctxt.globalCompositeOperation = 'destination-out';

  wrapText(ctxt, text, x, y, maxWidth, lineHeight);
  ctxt.setTransform(ratio, 0, 0, ratio, 0, 0);

  // console.log(element + ":");
  // console.log("     %w: " + percentW + ", %h: " + percentH);
  // console.log("     w: " + w + ", h: " + h);
  // console.log("     x: " + x + ", y: " + y);
}

function renderTextArray(arr) {
  arr.forEach(function(id){
    renderText(id);
  })
}