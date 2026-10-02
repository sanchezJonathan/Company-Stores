// This class renders image gallery template with next/prev buttons
// The method #render accepts a function (renderer) which should return an html
// It will show next/prev buttons If renderer has next/prev property
//
// Example:
//   // Content for gallery
//   let renderer1 = () => "<img src='https://dummyimage.com/300'>"
//   let renderer2 = () => "<img src='https://dummyimage.com/400'>"
//
//   // Make a double linked list
//   renderer1.next = renderer2
//   renderer1.prev = renderer2
//   renderer2.next = renderer1
//   renderer2.prev = renderer1
//
//   // Render gallery
//   const gallery = new ImageGallery()
//   const deferred = gallery.render(renderer1)
//   $.when(deferred).then(html => html.appendTo('body'))
//
var ImageGallery = function() {
  'use strict';

  var self = this;
  var $gallery = $('<div />', { class: 'gallery' })

  this.render = function(renderer) {
    return $.when(renderer()).then(function(html) {
      var $html = $(template({
        content: html,
        showNext: renderer.next,
        showPrev: renderer.prev
      }));
      $html.on('click', '.next', function() { self.render(renderer.next) });
      $html.on('click', '.prev', function() { self.render(renderer.prev) });

      $gallery.html($html);
      $gallery.trigger('gallery:render');

      return $gallery;
    });
  };

  var template = function (attrs) {
    var content = attrs.content

    var prev = attrs.showPrev ? "<a class='prev' href='javascript:void(0);'></a>" : ''
    var next = attrs.showNext ? "<a class='next' href='javascript:void(0);'></a>" : ''

    return "<div class='image-gallery'>" +
             content +
             "<div class='nav'>" +
               next + prev +
             "</div>" +
           "</div>";
  };
};
