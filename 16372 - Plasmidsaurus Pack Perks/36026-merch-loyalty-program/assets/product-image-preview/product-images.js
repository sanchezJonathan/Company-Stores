// ---------------------------------------- //
// CHANGE PRIMARY PRODUCT IMAGE ON HOVER
// ---------------------------------------- //

function storeMainImage() {
  var id = $('.gallery-main .main-img').data('id');
  var prevUrl = $('.gallery-main .main-img a').attr('href');
  $('.gallery-main .main-img').data('prev-image', {url: prevUrl, id: id});
};

function revertMainImage() {
  var prevImage = $('.gallery-main .main-img').data('prev-image');

  if (prevImage) {
    $('.gallery-main .main-img').data('id', prevImage.id);
    changePrimaryImage(prevImage.url);
  }
};

function changePrimaryImage(image_url_large) {
  var primary_link = $("#primary_image_link");
  var primary_img = $("#primary_image");

  removeElevateZoomFor(primary_img);

  primary_link.attr("href", image_url_large);
  primary_img.attr("href", image_url_large);
  primary_img.attr("src", image_url_large);

  createElevateZoomFor(primary_img);
}

function createElevateZoomFor(img) {
  img.elevateZoom({
    constrainType: "height",
    zoomType: "inner",
    // zoomLens  : "false",
    containLensZoom: true,
    responsive: true
  });
}

function removeElevateZoomFor(img) {
  $('.zoomContainer').remove();
  $('.zoomWrapper img.zoomed').unwrap();

  img.removeData('elevateZoom');
  img.removeData('zoomImage');
}

// ---------------------------------------- //
// CHANGE PRIMARY PRODUCT IMAGE ON OPTION SELECT
// ---------------------------------------- //
function changePrimaryImageOption(selected) {
  var image_url = $(selected).find('option:selected').data("new-image");
  if (image_url) {
    changePrimaryImage(image_url);
  }
}

function revertDefaultPrimaryImage() {
  var a = $('.images-container .image.primary a');

  var href = a.attr('href');
  var id = a.closest('.image').data('id');

  changePrimaryImage(href);
  $('.gallery-main .main-img').data('id', id);

  storeMainImage();
}

function existsInGallery(imageId) {
  return $(".images-container .image[data-id='" + imageId + "']").length > 0;
}

function bindProductImagePreview() {
  storeMainImage();
  createElevateZoomFor($('#primary_image'));

  $('select[data-type="product-option"]').on('change', function (event) {
    var imageId = $(this).find('option:selected').data('image-id');

    if (existsInGallery(imageId)) {
      changePrimaryImageOption(this);
      $('.gallery-main .main-img').data('id', imageId);
    }

    var $thumbnails = $(this).closest('.product-options .select-area.thumbnail');
    $thumbnails.find('li').removeClass('selected').removeClass('is-selected');

    /*if ($thumbnails.length > 0) {
      var index = $(this).data('dd').get('selectedIndex');

      if (index > 0) {
        var $li = $thumbnails.find('li').eq(index);
        $li.data('should-select', true);
        $li.addClass('selected').addClass('is-selected');
      }
    }*/

    storeMainImage();
  });

  $('.product-options .select-area.thumbnail li').on('click', function () {
    var $li = $(this);
    $li.siblings().removeClass('selected').removeClass('is-selected');

    if ($li.data('should-select') == true) {
      $li.data('should-select', false);
      $li.addClass('selected').addClass('is-selected');
    }
    else {
      $('select[data-type="product-option"]').val('').trigger('change').data('dd').set('selectedIndex', 0);
      revertDefaultPrimaryImage();
    }
  });

  $('.product-options .select-area.thumbnail li').on('mouseover', function () {
    var jOption = findOptionByLi(this);
    var imageId = jOption.data('image-id');

    if (existsInGallery(imageId)) {
      var imageUrl = jOption.data('new-image');
      changePrimaryImage(imageUrl);
    }
  });

  $('.product-options .select-area.thumbnail li').on('mouseout', function () {
    var jOption = findOptionByLi(this);
    var imageId = jOption.data('image-id');

    if (existsInGallery(imageId)) {
      revertMainImage();
    }
  });

  $(document).on('mouseover', '.images-container .image a', function () {
    var href = $(this).attr('href');
    var id = $(this).closest('.image').data('id');

    changePrimaryImage(href);
    $('.gallery-main .main-img').data('id', id);

    storeMainImage();
  });
};

function bindProductLogosPreview(productId) {
  var previewLogo = new PreviewLogo(productId);

  // Update hotspotted images on change logo
  $('select[data-type="virtual-logo"]').on('change', function () {
    var logoId = this.value;
    previewLogo.applyLogo(logoId);
    storeMainImage();
  });

  // If you roll over the thumb, and the main image is hospotted,
  // show the logo on the main image
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

  // Preload images
  $('.logo-info .select-area select option').each(function () {
    var logoId = $(this).val();
    previewLogo.preloadLogo(logoId);
  });
};

function bindUnselectLogo() {
  $('.logo-info .select-area.thumbnail li').on('click', function () {
    $(this).siblings().removeClass('is-selected');
    $(this).toggleClass('is-selected');

    if (!$(this).hasClass('is-selected')) {
      jSelect = $(this).closest('.select-area.thumbnail').find('select');
      jSelect.val('').trigger('change').data('dd').set('selectedIndex', 0);
    }
  });
};

function bindViewSideBySide() {
  'use strict';

  var $btn = $('.view-image-groups');
  var groupIDs = $btn.data('group-ids');

  $btn.on('click', function(e) {
    e.preventDefault();

    var images = {}
    $('.product-gallery .images-container .image').each(function(i, el) {
      var groupID = $(el).data('group-id');
      if (groupID) {
        var url = $(el).find('a').prop('href');

        images[groupID] = images[groupID] || [];
        images[groupID].push(url);
      }
    });

    // Sort images by group's position
    var groupedUrls = [];
    $.each(groupIDs, function(i, id) {
      var urls = images[id];
      if (urls) {
        groupedUrls.push(urls);
      }
    });

    ImageGroupGallery(groupedUrls);
  });
};

function bindVirtualSamplesPreview(productId) {
  var previewLogo = new PreviewLogo(productId);

  $("button.update-preview").on('click', function (event) {
    event.preventDefault();

    var $btn = $(event.target);
    var $form = $('.product-info form');
    var $gallery = $('.gallery-main');

    var xhr = $.ajax({
      url: $btn.data('url'),
      type: 'POST',
      data: $form.serializeArray(),
      dataType: 'json'
    });

    $gallery.showLoading({
      overlayZIndex: 1000,
      indicatorZIndex: 1001
    });

    xhr.done(function (data) {
      previewLogo.update(data);
      storeMainImage();
    }).always(function () {
      $gallery.hideLoading();
    });
  });
};

function bindDecorationMethods() {
  var productDecoration = new ProductDecoration;
  productDecoration.bindAccordion();
  productDecoration.bindColorSelect();
  productDecoration.bindSizeSelect();
  productDecoration.bindFontSelect();
  productDecoration.bindColorPicker();
  productDecoration.bindFontDecoration();
  productDecoration.preloadLocationSizeImages();

  var $select = $('select#decoration-method');
  $select.data("prev", $select.val());
  $select.on('change', function() {
    // Confirmation dialog
    var msg = 'Are you sure you want to change the decoration method?  Doing so will reset all location, logo, and decoration choices.';
    if ($select.data('prev') && !confirm(msg)) {
      $select.val($select.data('prev')); // revert back value
      return false;
    }

    // Reset decoration details
    productDecoration.reset();

    // Data for ajax
    var url = $select.data('url');
    var id = $select.val();

    // Store previous value, so we can revert it on 'change'
    $select.data('prev', id);

    // Show loader if ajax takes more then 1s
    var ajaxLoadTimeout = setTimeout(function() {
      $(".decoration-details").showLoading();
    }, 1000);

    // Fetch decoration details
    $.get(url, { decoration_method_id: id })
      .done(productDecoration.setup)
      .always(function () {
        clearTimeout(ajaxLoadTimeout);
        $(".decoration-details").hideLoading();
      });
  });
};

function bindColorRestrictions() {
  var logoCache = [];
  var colorCache = []

  $('select[data-type="virtual-logo"] option[data-colors-restrictions="true"]').each(function () {
    var colors = $(this).data("colors-whitelist") || $(this).data("colors-blacklist");
    colors = colors.split(",")

    logoCache.push({
      $el: $(this),
      colors: colors,
      black_list: !$(this).data("colors-whitelist")
    })
  })

  $('select[data-type="product-option"][data-option-type="color"] option').each(function () {
    if ($(this).val() && $(this).text()) {
      colorCache.push({
        $el: $(this),
        color: $(this).text().trim().toLowerCase()
      })
    }
  })

  $('select[data-type="virtual-logo"]').on('change', function (event) {
    var selectedLogo = $(this).find('option:selected');
    var selectedColor = $('select[data-type="product-option"][data-option-type="color"] option:selected').data("name");
    var colorsAttr = selectedLogo.data("colors-whitelist") || selectedLogo.data("colors-blacklist");
    var isBlackList = !selectedLogo.data("colors-whitelist");
    var colors = colorsAttr ? colorsAttr.split(",") : '';

    function deselectProductColors() {
      var logo_id = selectedLogo.val().trim();
      var color_id = $('select[data-type="product-option"][data-option-type="color"] option:selected').val().trim();
      var id = 'toast-'+ logo_id +'-'+ color_id;
      var count = $("." + id).length + 1;
      $(".notification-container").append('<div id="'+ id +'-'+ count +'" class="'+ id +' toast notif-error mt-2" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header bg-transparent"> <strong class="me-auto text-white">Sorry, there was a problem</strong> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body text-white">Logo "'+ selectedLogo.text().trim() +'" can’t be ordered in color "'+ selectedColor.trim() +'".</div> </div>')
      
      var toast = new bootstrap.Toast($("#" + id +'-'+ count));
      toast.show();
      
      var product_option_id = $('button.product-option-thumb').data("id");
      $("div.product-option-text-" + product_option_id).html("<span class='text-muted'>Please Select</span>");
      $('button.product-option-thumb.selected-prod-option').removeClass("selected-prod-option");
      $('select[data-type="product-option"][data-option-type="color"] option:selected').prop('selected', false);
      $('select[data-type="product-option"][data-option-type="color"]').val("").trigger("change");
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
  })

  $('select[data-type="product-option"][data-option-type="color"]').on('change', function (event) {
    $('button.logo-location-thumb').removeAttr("disabled");
    logoCache.forEach(function (logoElement) {
      logoElement.$el.removeAttr("disabled", "disabled")
    })

    var color_id = $(this).find('option:selected').val().trim();
    
    function deSelectLogos($el, currentColor) {
      var logo_id = $el.find('option:selected').val().trim();
      var id = 'toast-'+ logo_id +'-'+ color_id;
      var count = $("." + id).length + 1;
      $(".notification-container").append('<div id="'+ id +'-'+ count +'" class="'+ id +' toast notif-error mt-2" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header bg-transparent"> <strong class="me-auto text-white">Sorry, there was a problem</strong> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body text-white">Color "'+ currentColor.trim() +'" can’t be ordered in logo "'+ $el.find('option:selected').text().trim() +'".</div> </div>')
      var toast = new bootstrap.Toast($("#" + id + '-' + count));
      toast.show();
      
      var parent = $el.closest('div.select-area');
      $(parent).find('div.virtual-logo-container').find('div.logo-location-text').html("<span class='text-muted'>Please Select</span>");
      $(parent).find('div.virtual-logo-container').find('button.logo-location-thumb.selected-logo').removeClass("selected-logo");
      $el.find('option:selected').prop('selected', false);
      $el.val("").trigger("change");
    }

    colorCache.forEach(function (colorElement) {
      if (colorElement.$el.is(":selected")) {
        
        $('select[data-type="virtual-logo"]').each(function() {
          var selectedLogo = $(this).find('option:selected');
          var colorsAttr = selectedLogo.data("colors-whitelist") || selectedLogo.data("colors-blacklist");
          var isBlackList = !selectedLogo.data("colors-whitelist");
          var colors = colorsAttr ? colorsAttr.split(",") : '';

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
    })

    $('select[data-type="virtual-logo"]').trigger('msdropdown:refresh')
  })
}
