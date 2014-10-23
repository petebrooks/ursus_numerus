var txtIds = ['introTitle', 'projectsTitle', 'backgroundTitle', 'tikTitle', 'contactTitle'];
// var txtIds = ['introTitle', 'projectsTitle', 'contactTitle'];

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

$(document).ready(function() {

  renderTextArray(txtIds);

  $(window).resize(function() {
    renderTextArray(txtIds);
  });

  $(document).scroll(function() {
    checkPaths();
  });

  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

});