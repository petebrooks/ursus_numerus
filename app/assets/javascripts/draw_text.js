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
  function drawText(element, lineHeight) {
    var el = document.getElementById(element);
    var $el = $(el);
    var ctxt = el.getContext('2d');

    var text = $el.data('text');
    var padding = $el.data('padding') / 100; // as percent
    var fontSize = $el.data('font-size');

    var color = '#ffffff';
    var lineHeight = fontSize * 16; // convet rem to px

    var oldW = $(window).width();
    var oldH = $(window).height();

    var x = $(window).width() * padding;
    var y = $(window).height() * padding;

    var ratio = PIXEL_RATIO;

    el.width = oldW * ratio;
    el.height = oldH * ratio;
    el.style.width = oldW + 'px';
    el.style.height = oldH + 'px';

    ctxt.font = "Bold 2.8rem 'Helvetica'";
    ctxt.fillStyle = color;
    ctxt.fillRect(0, 0, oldW, oldH);
    ctxt.globalCompositeOperation = 'destination-out';

    var maxWidth = oldW-(x*2);
    wrapText(ctxt, text, x, y, maxWidth, lineHeight);
    ctxt.setTransform(ratio, 0, 0, ratio, 0, 0);
  }