// Applies logo composites to a product gallery (PDP or bundle member panel).
//
// Usage:
//   var previewLogo = new PreviewLogo(productId);
//   previewLogo.applyLogo(logoId);
//
// Scoped (bundle member):
//   var previewLogo = new PreviewLogo(productId, {
//     galleryRoot: panel,
//     configRoot: memberRow,
//     changePrimaryImage: function (url) { scope.changePrimaryImage(url); },
//   });
//
// Server response example:
//   {
//     "76753":"/composite_images/logo/23_76753_view_logo_preview_admin_preview1435156503.png",
//     "76757":"/composite_images/logo/23_76757_view_logo_preview_admin_preview1435155952.png"
//   }
//
var PreviewLogo = function (productId, options) {
  'use strict';

  options = options || {};
  var self = this;

  var $galleryRoot = options.galleryRoot ? $(options.galleryRoot) : $('.product-gallery');
  var $configRoot = options.configRoot ? $(options.configRoot) : null;
  var setMainImage = options.changePrimaryImage || changePrimaryImage;

  function $optionSelects() {
    if ($configRoot && $configRoot.length) {
      return $configRoot.find('select[data-type="product-option"]');
    }

    var scoped = $galleryRoot.find('select[data-type="product-option"]');
    return scoped.length ? scoped : $('select[data-type="product-option"]');
  }

  this.applyLogo = function (logoId) {
    this.fetchImages(logoId).done(this.update);
  };

  this.preloadLogo = function (logoId) {
    this.fetchImages(logoId).done(this.preloadImage);
  };

  this.preloadImage = function (response) {
    $.each(response, function (id, url) {
      var img = new Image();
      img.src = url;
    });
  };

  this.update = function (response) {
    self.updateThumbs(response);
    self.updateMainImage(response);
    self.updateProductOptionImages(response);
  };

  var responseCache = {};

  this.clearLogoCache = function (logoId) {
    delete responseCache[logoId];
  };

  this.clearCache = function () {
    responseCache = {};
  };

  this.fetchImages = function (logoId) {
    if (responseCache[logoId]) {
      return responseCache[logoId];
    }

    var request = $.get('/logos/images', {
      logo_id: logoId,
      product_id: productId,
    });

    responseCache[logoId] = request;

    request.done(function (response) {
      if (!response || $.isEmptyObject(response)) {
        delete responseCache[logoId];
      }
    });

    request.fail(function () {
      delete responseCache[logoId];
    });

    return request;
  };

  this.updateThumbs = function (response) {
    var imagesContainer = $galleryRoot.find('.images-container');

    $.each(response, function (id, url) {
      var container = imagesContainer.find('[data-id="' + id + '"]');
      container.find('a').attr('href', url);
      container.find('img').attr('src', url);
    });
  };

  this.updateProductOptionImages = function (response) {
    var optionSelects = $optionSelects();

    $.each(response, function (id, url) {
      var option = optionSelects.find('option[data-image-id="' + id + '"]');
      option.data('image', url);
      option.data('new-image', url);
    });
  };

  this.updateMainImage = function (response) {
    var mainImageContainer = $galleryRoot.find('.main-img');
    var id = mainImageContainer.data('id');
    var url = response[parseInt(id, 10)];

    if (url) {
      setMainImage(url);
    }
  };
};
