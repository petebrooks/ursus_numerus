// var txtIds = ['introTitle', 'projectsTitle', 'backgroundTitle', 'tikTitle', 'contactTitle'];
// var txtIds = ['introTitle', 'projectsTitle', 'contactTitle'];


function ready() {
  var txtIds = $('main').data('txtids');
  
  window.addEventListener('load', function() {
      FastClick.attach(document.body);
  }, false);

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

  if (!isMobile.any) {
    $('.hide').hide();
  } else {
    $('.arrow').hide();
  };

  var r = $('span#really');
  var run_reallys = setInterval(function(){
    var t = r.text() + " really";
    r.text(t);
  }, 800);
};

$(document).ready(ready);
$(document).on('page:load', ready);