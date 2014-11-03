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

  var i_vals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  var i_el = $('span#xi');
  var i_count = 0;
  var interval = setInterval(xCountUp, 400);
  function xCountUp() {
    i_el.text(i_vals[i_count]);
    if(i_count >= i_vals.length) {
      clearInterval(interval);
    } else { i_count++ }
  };

  var p_el = $('span.permute');
  var p_vals = scramble(p_el.text());
  var p_count = 0;
  var p_interval = setInterval(pCountUp, 50);
  function pCountUp() {
    p_el.text(p_vals[p_count]);
    if(p_count >= p_vals.length) {
      clearInterval(p_interval);
    } else { p_count++ }
  };
};

function scramble(theWord){

  //Array to store the generated words
  var words = [];

  /**
   * Recursive function to split a string and rearrange
   * it's characters and then join the results
   * @str: String [String to split]
   * @prefix: String [Characters to prepend to the string]
   */
  function rearrange(str, prefix) {

    var i, singleChar, balanceStr, word;

    //The first time round, prefix will be empty
    prefix = prefix || '';

    //Loop over the str to separate each single character
    //from the rest of it's characters
    for(i = 0; i < str.length; i++) {
      singleChar = str[i];
      balanceStr = str.slice(0, i) + str.slice(i+1);

      //join the prefix with each of the combinations
      word = prefix + singleChar + balanceStr;

      //Inject this word only if it does not exist
      if(words.indexOf(word) < 0) words.push(word);

      //Recursively call this function in case there are balance characters
      if(balanceStr.length > 1) rearrange(balanceStr, prefix + singleChar);

    }

  }

  //kick start recursion
  rearrange(theWord);
  return shuffle(words).slice(0, 50).concat(theWord);

}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(document).ready(ready);
$(document).on('page:load', ready);