$(document).ready(function(){
  // Fill viewport on some divs
  resizeDiv();

  // Smooth Scrolling
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

  // Lightbox for bios
  $('.js-bio-popup').magnificPopup({
    type: 'ajax',
    alignTop: true,
    overflowY: 'scroll'
  });


  // Data from Google Spreadsheets for Events
  $.get("https://gridspree.io/ss/LbE7cn9Xit8QWzYy42x4uK", function(data) {
    injectEvents(data);
    $(".js-events-loading").remove();
  });

  // Data from Google Spreadsheets for Blog Posts
  $.get("https://gridspree.io/ss/CDkCYMfuGGWMR4xKXeuaSV", function(data) {
    injectLinks(data);
    $(".js-links-loading").remove();
  });

  // Data from Google Spreadsheets for Highlight
  $.get("https://gridspree.io/ss/nM4vtN2jMrTefZfLNkiqmh", function(data) {
    injectHighlight(data);
    $(".js-highlight-loading").remove();
  });

});

window.onresize = function(event) {
  resizeDiv();
}

function resizeDiv() {
  vpw = $(window).width();
  vph = $(window).height();
  $('.js-fill-viewport').css({'min-height': vph-20 + 'px'});
}

function injectEvents(events) {
  $.each(events["rows"], function(i, val) {
    var eventHtml =  "<div class=\"event\">" +
        "<a href=\"" + val.url + "\" class=\"event__link\">" +
          "<div class=\"event__logo\"><div><img src=\"http://googledrive.com/host/0B8q2MFMBD9mFNmtMWHV5VFdnTEU/" + val.image + "\" alt=\"" + val.name + "\"></div></div>" +
          "<div class=\"event__date\">" + val.date + "</div>" +
        "</a>" +
      "</div>";
    $(".js-events").append(eventHtml);
  });
}


function injectLinks(links) {
  $.each(links["rows"], function(i, val) {
    var linkHtml = "<div class=\"link\">" +
        "<div class=\"link__bullet\"><img src=\"/img/icon-bullet.svg\"></div>" +
        "<div class=\"link__date\">" + val.date + "</div>" +
        "<div class=\"link__url\"><a href=\"" + val.url + "\">" + val.name + "</a></div>" +
      "</div>";
    $(".js-links").append(linkHtml);
  });
}

function injectHighlight(highlight) {
   $.each(highlight["rows"], function(i, val) {
    var highlightHtml = "<h1>" + val.title + "</h1>" +
        "<div class=\"highlight__content\">" + val.content + "</div>" +
        "<div class=\"highlight__action\">" +
          "<a href=\"" + val.url + "\" class=\"button button--reverse\">" + val.label + "</a>" +
        "</div>";
    $(".js-highlight").append(highlightHtml);
  });
}
