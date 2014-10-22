//   var PIXEL_RATIO = (function () {
//       var ctx = document.createElement("canvas").getContext("2d"),
//           dpr = window.devicePixelRatio || 1,
//           bsr = ctx.webkitBackingStorePixelRatio ||
//                 ctx.mozBackingStorePixelRatio ||
//                 ctx.msBackingStorePixelRatio ||
//                 ctx.oBackingStorePixelRatio ||
//                 ctx.backingStorePixelRatio || 1;

//       return dpr / bsr;
//   })();


//   createHiDPICanvas = function(w, h, ratio) {
//       if (!ratio) { ratio = PIXEL_RATIO; }
//       var c = document.createElement("canvas");
//       c.width = w * ratio;
//       c.height = h * ratio;
//       c.style.width = w + "px";
//       c.style.height = h + "px";
//       c.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
//       return c;
//   }

//   function wrapText(context, text, x, y, maxWidth, lineHeight) {
//     var words = text.split(" ");
//     var line = "";
//     for(var n = 0; n < words.length; n++) {
//       var testLine = line + words[n] + " ";
//       var metrics = context.measureText(testLine);
//       var testWidth = metrics.width;
//       if(testWidth > maxWidth) {
//         context.fillText(line, x, y);
//         line = words[n] + " ";
//         y += lineHeight;
//       }
//       else {
//         line = testLine;
//       }
//     }
//     context.fillText(line, x, y);
// }
//   function drawText(element) {
//     var el = document.getElementById(element);
//     var $el = $(el);
//     var ctxt = el.getContext('2d');

//     var winWidth = $(window).width();
//     var winHeight = $(window).height();

//     var text = $el.data('text');
//     var padding = $el.data('padding'); // as percent
//     var fontSize = $el.data('fontSize');
//     var size = $el.data('size') * winWidth;

//     var color = '#ffffff';
//     var lineHeight = fontSize * 16; // convet rem to px

//     var x = winWidth * padding;
//     var y = winHeight * padding;

//     var ratio = PIXEL_RATIO;

//     el.width = el.height = size * ratio;
//     el.style.width = size + 'px';
//     el.style.height = size + 'px';

//     ctxt.font = "Bold " + fontSize + "rem 'Helvetica'";
//     ctxt.fillStyle = color;
//     ctxt.fillRect(0, 0, size, size);
//     ctxt.globalCompositeOperation = 'destination-out';

//     var maxWidth = size-(x*2);
//     wrapText(ctxt, text, x, y, maxWidth, lineHeight);
//     ctxt.setTransform(ratio, 0, 0, ratio, 0, 0);
//   }