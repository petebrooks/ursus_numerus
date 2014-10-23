function checkPaths() {
  $('.delayAnimate.ready').each(function(){
    console.log("checkPaths");
     var $this = $(this),
         scroll = $(window).scrollTop() + $(window).height();
         offset = $this.offset().top;
     if(scroll > offset) {
        var paths = $this.find('path');
        triggerDraw(paths);
        $this.attr('class', 'delayAnimate');
     };
  });
}

function triggerDraw(paths) {
   [].forEach.call(paths, function(p) {
      var length = p.getTotalLength();
      var time = '4s';
      p.style.transition = p.style.WebkitTransition = 'none'; // clear previous
      p.style.strokeDasharray = length + ' ' + length;
      p.style.strokeDashoffset = length;

      p.getBoundingClientRect(); // re-render layout
      p.style.transition = p.style.WebkitTransition = 'stroke-dashoffset ' + time + ' ease-in-out';
      p.style.strokeDashoffset = '0';
   });
}