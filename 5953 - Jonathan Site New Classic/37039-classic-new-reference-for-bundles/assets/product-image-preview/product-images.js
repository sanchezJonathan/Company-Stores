// ---------------------------------------- //
// PRODUCT PREVIEW SCOPE
// One scope = one product's gallery panel + config root (PDP: N=1, bundle: N members).
// ---------------------------------------- //

var defaultProductPreviewScope = null;

function ProductPreviewScope(options) {
  this.id = options.id || null;
  this.productId = options.productId || options.id || null;
  this.configRoot = options.configRoot;
  this.galleryPanel = options.galleryPanel;
  this.galleryInteractionEnabled = options.galleryInteractionEnabled || null;
  this.galleryVisible = options.galleryVisible || null;
}

ProductPreviewScope.prototype.$config = function () {
  return $(this.configRoot);
};

ProductPreviewScope.prototype.$gallery = function () {
  return $(this.galleryPanel);
};

ProductPreviewScope.prototype.mainImgEl = function () {
  if (!this.galleryPanel) return null;
  return this.galleryPanel.querySelector('.main-img');
};

ProductPreviewScope.prototype.primaryLink = function () {
  if (!this.galleryPanel) return null;
  return this.galleryPanel.querySelector('.main-img .primary-image-link');
};

ProductPreviewScope.prototype.primaryImg = function () {
  var link = this.primaryLink();
  if (link) return link.querySelector('img');
  var mainImg = this.mainImgEl();
  return mainImg ? mainImg.querySelector('img') : null;
};

ProductPreviewScope.prototype.canInteractWithGallery = function () {
  if (this.galleryInteractionEnabled && !this.galleryInteractionEnabled()) return false;
  if (this.galleryVisible && !this.galleryVisible()) return false;
  return true;
};

ProductPreviewScope.prototype.storeMainImage = function () {
  var mainImg = this.mainImgEl();
  if (!mainImg) return;

  var link = this.primaryLink();
  var img = this.primaryImg();

  mainImg.dataset.prevImage = JSON.stringify({
    url: link ? link.getAttribute('href') : img ? img.getAttribute('src') : '',
    id: mainImg.dataset.id || '',
  });
};

ProductPreviewScope.prototype.revertMainImage = function () {
  var mainImg = this.mainImgEl();
  if (!mainImg || !mainImg.dataset.prevImage) return;

  var prev = JSON.parse(mainImg.dataset.prevImage);
  this.changePrimaryImage(prev.url);
  this.setMainImageId(prev.id);
};

ProductPreviewScope.prototype.changePrimaryImage = function (imageUrl) {
  if (!imageUrl) return;

  var link = this.primaryLink();
  var img = this.primaryImg();
  if (!img) return;

  removeElevateZoomFor($(img));

  if (link) link.setAttribute('href', imageUrl);
  img.setAttribute('href', imageUrl);
  img.setAttribute('src', imageUrl);

  this.initZoom();
};

ProductPreviewScope.prototype.initZoom = function () {
  var img = this.primaryImg();
  if (img) createElevateZoomFor($(img));
};

ProductPreviewScope.prototype.setMainImageId = function (imageId) {
  var mainImg = this.mainImgEl();
  if (mainImg) mainImg.dataset.id = imageId;
};

ProductPreviewScope.prototype.existsInGallery = function (imageId) {
  if (!imageId || !this.galleryPanel) return false;
  return (
    this.$gallery().find(".images-container .image[data-id='" + imageId + "']").length > 0
  );
};

ProductPreviewScope.prototype.revertDefaultPrimaryImage = function () {
  var $primary = this.$gallery().find('.images-container .image.primary a');
  var href = $primary.attr('href');
  var id = $primary.closest('.image').data('id');

  if (href) {
    this.changePrimaryImage(href);
    this.setMainImageId(id);
    this.storeMainImage();
  }
};

ProductPreviewScope.forProductPage = function () {
  return new ProductPreviewScope({
    configRoot:
      document.querySelector('.line-items-reflective-view') ||
      document.querySelector('.product-page-main') ||
      document,
    galleryPanel: document.querySelector('.product-gallery .gallery-main'),
  });
};

ProductPreviewScope.forBundleMember = function (row, panel, options) {
  options = options || {};

  return new ProductPreviewScope({
    id: row.dataset.bundleProductId,
    productId: row.dataset.productId,
    configRoot: row,
    galleryPanel: panel,
    galleryInteractionEnabled: options.galleryInteractionEnabled,
    galleryVisible: options.galleryVisible,
  });
};

ProductPreviewScope.forGalleryPanel = function (panel, options) {
  options = options || {};

  return new ProductPreviewScope({
    id: panel.dataset.bundleProductId,
    productId: panel.dataset.productId,
    configRoot: panel,
    galleryPanel: panel,
    galleryInteractionEnabled: options.galleryInteractionEnabled,
    galleryVisible: options.galleryVisible,
  });
};

// ---------------------------------------- //
// GLOBAL HELPERS (default PDP scope — used by PreviewLogo / virtual samples)
// ---------------------------------------- //

function storeMainImage() {
  if (defaultProductPreviewScope) defaultProductPreviewScope.storeMainImage();
}

function revertMainImage() {
  if (defaultProductPreviewScope) defaultProductPreviewScope.revertMainImage();
}

function changePrimaryImage(image_url_large) {
  if (defaultProductPreviewScope) defaultProductPreviewScope.changePrimaryImage(image_url_large);
}

function createElevateZoomFor(img) {
  img.elevateZoom({
    constrainType: 'height',
    zoomType: 'inner',
    containLensZoom: true,
    responsive: true,
  });
}

function removeElevateZoomFor(img) {
  $('.zoomContainer').remove();
  $('.zoomWrapper img.zoomed').unwrap();

  img.removeData('elevateZoom');
  img.removeData('zoomImage');
}

// ---------------------------------------- //
// BIND PRODUCT IMAGE PREVIEW (per scope)
// ---------------------------------------- //

function bindProductImagePreview(scope) {
  if (!scope) {
    scope = ProductPreviewScope.forProductPage();
    defaultProductPreviewScope = scope;
  }

  if (!scope.galleryPanel || !scope.configRoot) return;

  var $config = scope.$config();
  var $panel = scope.$gallery();

  scope.storeMainImage();
  scope.initZoom();

  $config.find('select[data-type="product-option"]').on('change', function () {
    var $select = $(this);
    var imageId = $select.find('option:selected').data('image-id');
    var imageUrl = $select.find('option:selected').data('new-image');

    if (scope.existsInGallery(imageId) && imageUrl) {
      scope.changePrimaryImage(imageUrl);
      scope.setMainImageId(imageId);
    }

    $select.closest('.product-options .select-area.thumbnail').find('li').removeClass('selected is-selected');

    scope.storeMainImage();
  });

  $config.find('.product-options .select-area.thumbnail li').on('click', function () {
    var $li = $(this);
    $li.siblings().removeClass('selected is-selected');

    if ($li.data('should-select') == true) {
      $li.data('should-select', false);
      $li.addClass('selected is-selected');
      return;
    }

    var $optionSelect = $li.closest('.select-area.thumbnail').find('select[data-type="product-option"]');
    $optionSelect.val('').trigger('change');
    if ($optionSelect.data('dd')) {
      $optionSelect.data('dd').set('selectedIndex', 0);
    }
    scope.revertDefaultPrimaryImage();
  });

  $config.find('.product-options .select-area.thumbnail li').on('mouseover', function () {
    if (typeof findOptionByLi !== 'function') return;

    var jOption = findOptionByLi(this);
    var imageId = jOption.data('image-id');

    if (scope.existsInGallery(imageId)) {
      scope.storeMainImage();
      scope.changePrimaryImage(jOption.data('new-image'));
    }
  });

  $config.find('.product-options .select-area.thumbnail li').on('mouseout', function () {
    if (typeof findOptionByLi !== 'function') return;

    var jOption = findOptionByLi(this);
    var imageId = jOption.data('image-id');

    if (scope.existsInGallery(imageId)) {
      scope.revertMainImage();
    }
  });

  $panel.find('.images-container .image a')
    .on('mouseenter', function () {
      if (!scope.canInteractWithGallery()) return;

      var href = $(this).attr('href');
      var id = $(this).closest('.image').data('id');

      scope.storeMainImage();
      scope.changePrimaryImage(href);
      scope.setMainImageId(id);
    })
    .on('mouseleave', function () {
      if (!scope.canInteractWithGallery()) return;
      scope.revertMainImage();
    });
}

function bindProductLogosPreview(productId) {
  var previewLogo = new PreviewLogo(productId);

  $('.line-items-reflective-view').data('preview-logo', previewLogo);

  $('select[data-type="virtual-logo"]').on('change', function () {
    var logoId = this.value;
    previewLogo.applyLogo(logoId);
    storeMainImage();
  });

  $('.logo-info .select-area.thumbnail li').on('mouseover', function () {
    var jOption = findOptionByLi(this);
    var logoId = jOption.val();
    previewLogo.applyLogo(logoId);
  });

  $('.logo-info .select-area.thumbnail li').on('mouseout', function () {
    var jSelect = findSelectByLi(this);
    var logoId = jSelect.val();
    previewLogo.applyLogo(logoId);
  });

  $('.logo-info .select-area select option').each(function () {
    var logoId = $(this).val();
    previewLogo.preloadLogo(logoId);
  });
}

function bindUnselectLogo(root) {
  var $root = root ? $(root) : $(document);

  $root.find('.logo-info .select-area.thumbnail li').on('click', function () {
    $(this).siblings().removeClass('is-selected');
    $(this).toggleClass('is-selected');

    if (!$(this).hasClass('is-selected')) {
      jSelect = $(this).closest('.select-area.thumbnail').find('select');
      jSelect.val('').trigger('change').data('dd').set('selectedIndex', 0);
    }
  });
}

function bindViewSideBySide() {
  'use strict';

  var $btn = $('.view-image-groups');
  var groupIDs = $btn.data('group-ids');

  $btn.on('click', function (e) {
    e.preventDefault();

    var images = {};
    $('.product-gallery .images-container .image').each(function (i, el) {
      var groupID = $(el).data('group-id');
      if (groupID) {
        var url = $(el).find('a').prop('href');

        images[groupID] = images[groupID] || [];
        images[groupID].push(url);
      }
    });

    var groupedUrls = [];
    $.each(groupIDs, function (i, id) {
      var urls = images[id];
      if (urls) {
        groupedUrls.push(urls);
      }
    });

    ImageGroupGallery(groupedUrls);
  });
}

function bindVirtualSamplesPreview(productId) {
  var previewLogo = new PreviewLogo(productId);

  $('button.update-preview').on('click', function (event) {
    event.preventDefault();

    var $btn = $(event.target);
    var $form = $('.product-info form');
    var $gallery = $('.gallery-main');

    var xhr = $.ajax({
      url: $btn.data('url'),
      type: 'POST',
      data: $form.serializeArray(),
      dataType: 'json',
    });

    $gallery.showLoading({
      overlayZIndex: 1000,
      indicatorZIndex: 1001,
    });

    xhr
      .done(function (data) {
        previewLogo.update(data);
        storeMainImage();
      })
      .always(function () {
        $gallery.hideLoading();
      });
  });
}

function bindColorRestrictions(root) {
  var $root = root ? $(root) : $(document);
  var logoCache = [];
  var colorCache = [];

  $root.find('select[data-type="virtual-logo"] option[data-colors-restrictions="true"]').each(function () {
    var colors = $(this).data('colors-whitelist') || $(this).data('colors-blacklist');
    colors = colors.split(',');

    logoCache.push({
      $el: $(this),
      colors: colors,
      black_list: !$(this).data('colors-whitelist'),
    });
  });

  $root.find('select[data-type="product-option"][data-option-type="color"] option').each(function () {
    if ($(this).val() && $(this).text()) {
      colorCache.push({
        $el: $(this),
        color: $(this).text().trim().toLowerCase(),
      });
    }
  });

  $root.find('select[data-type="virtual-logo"]').on('change', function (event) {
    var selectedLogo = $(this).find('option:selected');
    var $colorSelect = $root.find('select[data-type="product-option"][data-option-type="color"]');
    var selectedColor = $colorSelect.find('option:selected').data('name');
    var colorsAttr = selectedLogo.data('colors-whitelist') || selectedLogo.data('colors-blacklist');
    var isBlackList = !selectedLogo.data('colors-whitelist');
    var colors = colorsAttr ? colorsAttr.split(',') : '';

    function deselectProductColors() {
      var logo_id = selectedLogo.val().trim();
      var color_id = $colorSelect.find('option:selected').val().trim();
      var id = 'toast-' + logo_id + '-' + color_id;
      var count = $('.' + id).length + 1;
      $('.notification-container').append(
        '<div id="' +
          id +
          '-' +
          count +
          '" class="' +
          id +
          ' toast notif-error mt-2" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header bg-transparent"> <strong class="me-auto text-white">Sorry, there was a problem</strong> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body text-white">Logo "' +
          selectedLogo.text().trim() +
          '" can’t be ordered in color "' +
          selectedColor.trim() +
          '".</div> </div>'
      );

      var toast = new bootstrap.Toast($('#' + id + '-' + count));
      toast.show();

      var product_option_id = $root.find('button.product-option-thumb').data('id');
      $root.find('div.product-option-text-' + product_option_id).html(
        "<span class='text-muted'>Please Select</span>"
      );
      $root.find('button.product-option-thumb.selected-prod-option').removeClass('selected-prod-option');
      $colorSelect.find('option:selected').prop('selected', false);
      $colorSelect.val('').trigger('change');
    }

    selectedColor = selectedColor && selectedColor.toLowerCase();
    if (isBlackList) {
      if (colors.includes(selectedColor)) {
        deselectProductColors();
      }

      return;
    }

    if (!!selectedColor && !colors.includes(selectedColor)) {
      deselectProductColors();
    }
  });

  $root.find('select[data-type="product-option"][data-option-type="color"]').on('change', function (event) {
    $root.find('button.logo-location-thumb').removeAttr('disabled');
    logoCache.forEach(function (logoElement) {
      logoElement.$el.removeAttr('disabled', 'disabled');
    });

    var color_id = $(this).find('option:selected').val().trim();

    function deSelectLogos($el, currentColor) {
      var logo_id = $el.find('option:selected').val().trim();
      var id = 'toast-' + logo_id + '-' + color_id;
      var count = $('.' + id).length + 1;
      $('.notification-container').append(
        '<div id="' +
          id +
          '-' +
          count +
          '" class="' +
          id +
          ' toast notif-error mt-2" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header bg-transparent"> <strong class="me-auto text-white">Sorry, there was a problem</strong> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body text-white">Color "' +
          currentColor.trim() +
          '" can’t be ordered in logo "' +
          $el.find('option:selected').text().trim() +
          '".</div> </div>'
      );
      var toast = new bootstrap.Toast($('#' + id + '-' + count));
      toast.show();

      var parent = $el.closest('div.select-area');
      $(parent)
        .find('div.virtual-logo-container')
        .find('div.logo-location-text')
        .html("<span class='text-muted'>Please Select</span>");
      $(parent)
        .find('div.virtual-logo-container')
        .find('button.logo-location-thumb.selected-logo')
        .removeClass('selected-logo');
      $el.find('option:selected').prop('selected', false);
      $el.val('').trigger('change');
    }

    colorCache.forEach(function (colorElement) {
      if (colorElement.$el.is(':selected')) {
        $root.find('select[data-type="virtual-logo"]').each(function () {
          var selectedLogo = $(this).find('option:selected');
          var colorsAttr =
            selectedLogo.data('colors-whitelist') || selectedLogo.data('colors-blacklist');
          var isBlackList = !selectedLogo.data('colors-whitelist');
          var colors = colorsAttr ? colorsAttr.split(',') : '';

          if (isBlackList) {
            if (colors.includes(colorElement.color)) {
              deSelectLogos($(this), colorElement.color);
            }

            return;
          }

          if (!colors.includes(colorElement.color)) {
            deSelectLogos($(this), colorElement.color);
          }
        });
      }
    });

    $root.find('select[data-type="virtual-logo"]').trigger('msdropdown:refresh');
  });
}
