var ProductDecoration = function() {
  'use strict';

  this.reset = function() {
    // Unselect all logos
    $('.logo-info li.is-selected').click();

    // Reset custom text
    $('.decoration-custom-text select').prop('selectedIndex', 0).trigger('change');
    $('.decoration-custom-text textarea').val('');
  };

  this.setup = function(json) {
    json = json || {};

    var setSizes = function(sizes) {
      var sizeOption = function(size) {
        var text = size.name + parenthesis(size.price);

        return buildOption(size.id, text, {
          'data-size-value': size.value,
          'data-storefront-text': size.storefront_text
        });
      };

      // Build html options
      var options = $.map(sizes, sizeOption).join('');

      // Replace size options
      $('select.decoration-size')
        .html(notSpecifiedOption() + options)
        .trigger('change');
    };

    var setColors = function(colors) {
      var colorOption = function(color) {
        return buildOption(color.id, color.name + parenthesis(color.price), { 'data-color-value': color.value });
      };

      // Build html options
      var options = $.map(colors, colorOption).join('');

      // Replace color options
      $('select.decoration-number-of-colors')
        .html(notSpecifiedOption() + options)
        .trigger('change');
    };

    var setPalettes = function(options) {
      $('select#decoration-method').data('show-hex', options.showHex);
      $('select#decoration-method').data('show-pantone', options.showPantone);
      $('select#decoration-method').data('show-thread', options.showThread);
    };

    var toggleCustomText = function(value) {
      $('.product-decorations').toggleClass('custom-text-enabled', value);
    };

    var parenthesis = function(value) {
      return value ? " (" + value + ")" : '';
    };

    var notSpecifiedOption = function() {
      return '<option>Please select</option>';
    };

    var buildOption = function(value, text, attrs) {
      return $('<option>')
        .val(value)
        .text(text)
        .attr(attrs || {})
        .prop('outerHTML');
    };

    var sizes = json.sizes || [];
    var colors = json.colors || [];

    // Toggle visibility for colors/sizes
    $('.form-group.decoration-sizes').toggle(!!sizes.length);
    $('.form-group.decoration-colors').toggle(!!colors.length);

    toggleCustomText(json.custom_text_enabled || false);
    setSizes(sizes);
    setColors(colors);
    setPalettes({
      showHex: json.hex_colors_enabled,
      showPantone: json.pantone_colors_enabled,
      showThread: json.thread_colors_enabled
    });

    $('.product-decorations select').trigger('msdropdown:refresh');
  };

  this.bindAccordion = function() {
    $('.decoration-location h5').on('click', function() {
      var $wrapper = $(this).closest('.decoration-location');

      // Open/close target
      $wrapper.toggleClass('open').find('.container').slideToggle(fixMSDropdown)
    });

    // Fix for BSITES-2276. ms dropdown set height to zero when list is too long
    var fixMSDropdown = function() {
      if ($(this).closest('.decoration-location').hasClass('open')) {
        $(this).find('select').trigger('msdropdown:refresh');
      }
    };
  };

  this.bindColorSelect = function() {
    // Add as many colors as selected
    $('select.decoration-number-of-colors').on('change', function() {
      var $wrapper = $(this).closest('.decoration-colors');
      var template = $wrapper.find('.decoration-color-template').html();
      var $colorsContainer = $wrapper.find('.decoration-color-choices');

      // Remove existing colors
      $colorsContainer.empty();

      // Add new colors
      var count = $(this).find(':selected').data('color-value') || 0;

      for (var i = 1; i <= count; i++) {
        var label = nth(i) + ' Color'; // 1st Color, 2nd Color
        var color = replace(template, { label: label, index: i });
        $colorsContainer.append(color);
      }
    });

    // 1st, 2nd, 3rd, 4th, 5th, ...
    var nth = function(n) { return n + (["st","nd","rd"][((n+90)%100-10)%10-1] || "th"); }

    // Replaces variables in template
    var replace = function(text, obj) {
      var result = text;
      $.each(obj, function(key, value) {
        result = result.replace(new RegExp(':' + key, 'g'), value);
      });
      return result;
    }
  };

  this.bindSizeSelect = function() {
    $('select.decoration-size').on('change', function() {
      var $wrapper = $(this).closest('.decoration-location');

      // Display location image
      var size = $(this).find(':selected').data('size-value');
      if (size) {
        var url = $wrapper.data(size + "-image");
        var img = $('<img>').prop('src', url);
        $wrapper.find('.location-image').html(img);
      } else {
        $wrapper.find('.location-image').empty();
      }

      // Display storefront text
      var text = $(this).find(':selected').data('storefront-text');
      if (text) {
        $wrapper.find('.storefront-text').text(text);
      } else {
        $wrapper.find('.storefront-text').empty();
      }
    });
  };

  this.bindFontSelect = function () {
    var $fontSelect = $('select.font');
    $fontSelect.on('change', function() {
      var $wrapper = $(this).closest('.decoration-custom-text');
      var $stylesSelect = $wrapper.find('.font-style');
      var $stylesWrapper = $stylesSelect.closest('.form-group');

      var fontStyles = $(this).find(':selected').data('font-styles');
      var selectedStyle = parseInt($stylesSelect.data('selected-id'));

      // Display font style options
      $stylesSelect.empty();
      $stylesWrapper.hide();

      if (fontStyles) {
        for(var i = 0; i < fontStyles.length; i++) {
          $("<option/>")
            .val(fontStyles[i].id)
            .text(fontStyles[i].style)
            .attr('style', fontStyles[i].css_font_family)
            .prop('selected', selectedStyle == fontStyles[i].id)
            .appendTo($stylesSelect);
        }

        $stylesWrapper.show();
      }

      $stylesSelect
        .trigger('change')
        .trigger('msdropdown:refresh');

    });

    $fontSelect.trigger('change');
  };

  this.bindColorPicker = function() {
    $('.product-decorations').on('click', '.decoration-color', function(e) {
      var $el = $(e.currentTarget);
      var decorationSelect = $('select#decoration-method')

      new DecorationColorPicker({
        showHex: decorationSelect.data('show-hex'),
        showPantone: decorationSelect.data('show-pantone'),
        showThreads: decorationSelect.data('show-thread'),
        colorType: $el.find('input.color-type').val(),
        colorName: $el.find('input.color-name').val(),
        callback: function(colorData) {
          updateColor($el, colorData);
        }
      });
    });

    var updateColor = function($el, options) {
      // Render name and color
      $el.find('.color .name').text(options.displayName);
      $el.find('.color .hex-color').css({ backgroundColor: options.hexValue });

      // Inputs
      $el.find('input.color-name').val(options.colorName);
      $el.find('input.color-type').val(options.colorType);
      $el.find('input.hex-value').val(options.hexValue);

      // Trigger change in order to recalculate prices
      $el.find('input').trigger('change');
    };
  };

  this.bindFontDecoration = function() {
    $('.font-decoration').on('msdropdown:refresh', function(e) {
      var $select = $(e.currentTarget);
      var labels = $select.closest('.form-group').find('.dd ul li .ddlabel');

      labels.each(function(_, label) {
        var text = $(label).text().toLowerCase();
        $(label).addClass(text);
      });
    })
  };

  this.preloadLocationSizeImages = function() {
    $.each($('.decoration-location'), function() {
      var $el = $(this);
      $.each(['small', 'medium', 'large'], function() {
        var url = $el.data(this + '-image');
        var img = new Image();
        img.src = url;
      });
    });
  };
};
