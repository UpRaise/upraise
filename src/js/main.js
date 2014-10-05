$(document).ready(function(){
  resizeDiv();
});

window.onresize = function(event) {
  resizeDiv();
}

function resizeDiv() {
  vpw = $(window).width();
  vph = $(window).height();
  $('.js-fill-viewport').css({'min-height': vph-20 + 'px'});
}

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