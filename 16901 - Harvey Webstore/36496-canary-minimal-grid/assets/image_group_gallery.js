var ImageGroupGallery = function(groupedUrls) {
  'use strict';

  var doubleLinkedList = function(array) {
    array.forEach(function(item, index) {
      item.next = array[index + 1] || array[0];
      item.prev = array[index - 1] || array[array.length - 1];
    });
    return array;
  };

  var imageTemplate = function(src) {
    var img = $('<img />', { src: src }).prop('outerHTML');
    return "<span class='image'>" + img + "</span>";
  };

  var preloadUrl = function(src) {
    var deferred = $.Deferred();

    var image = new Image;
    image.src = src;
    image.onload = function() {
      deferred.resolve(src);
    };

    return deferred;
  };

  var urlsToRender = function(urls) {
    return function() {
      var deferred = $.Deferred();

      // Preload images
      $.when.apply($, urls.map(preloadUrl)).done(function() {
        var images = $.map(arguments, imageTemplate);
        var html = images.join('')

        deferred.resolve(html);
      })

      return deferred;
    }
  };

  var gallery = new ImageGallery();
  var dialog = new Dialog();

  var renderers = groupedUrls.map(urlsToRender);
  var renderer = (renderers.length > 1) ? doubleLinkedList(renderers)[0] : renderers[0];

  if (renderer) {
    dialog.render(gallery.render(renderer));
    dialog.show();
  }

  $(document.body).on('gallery:render', function(e) {
    $(e.target).trigger('dialog:recenter');
  });
};
