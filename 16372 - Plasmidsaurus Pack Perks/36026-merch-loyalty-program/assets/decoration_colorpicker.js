;var DecorationColorPicker, HexColorPicker, PantoneColorPicker, ThreadColorPicker,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DecorationColorPicker = (function() {
  DecorationColorPicker.prototype.options = {
    showHex: true,
    showPantone: true,
    showThreads: true,
    colorType: 'hex',
    colorName: '#000000',
    callback: $.noop
  };

  DecorationColorPicker.prototype.tabs = [];

  DecorationColorPicker.prototype.template = "<div class=\"colorpicker-tabs\">\n  <ul class=\"tabs\">\n    <li id=\"tab-hex\"><a href=\"#hex\">Colors</a></li>\n    <li id=\"tab-pantone\"><a href=\"#pantone\">PMS Colors</a></li>\n    <li id=\"tab-thread\"><a href=\"#thread\">Thread Colors</a></li>\n  </ul>\n  <div id=\"hex\"></div>\n  <div id=\"pantone\"></div>\n  <div id=\"thread\"></div>\n</div>";

  function DecorationColorPicker(options) {
    this._onSelect = bind(this._onSelect, this);
    this._onDialogOpen = bind(this._onDialogOpen, this);
    this._onDialogClose = bind(this._onDialogClose, this);
    this._onDialogCreate = bind(this._onDialogCreate, this);
    $.extend(this.options, options);
    this._initDialog();
  }

  DecorationColorPicker.prototype.setValue = function(colorType, colorName) {
    var tab;
    colorType = colorType || Object.keys(this.tabs)[0]
    tab = this.tabs[colorType];
    if (tab) {
      this.dialog.find(".tabs #tab-" + colorType + " a").click();
      this.activeTab = tab;
      return tab.setValue(colorName);
    } else {
      throw new Error("[DecorationColorPicker] Unknown colorType: " + colorType);
    }
  };

  DecorationColorPicker.prototype._initDialog = function() {
    this.dialog = $(this.template);
    this.dialog.dialog({
      autoOpen: true,
      draggable: false,
      resizable: false,
      closeOnEscape: true,
      modal: true,
      stack: false,
      appendTo: 'body',
      title: 'Select Color',
      dialogClass: 'colorpicker-dialog',
      close: this._onDialogClose,
      zIndex: 4000,
      width: 800,
      create: this._onDialogCreate,
      open: this._onDialogOpen,
      buttons: [
        {
          text: 'Cancel',
          "class": 'button-cancel',
          click: (function(_this) {
            return function() {
              return _this.dialog.dialog('close');
            };
          })(this)
        }, {
          text: 'Select Color',
          "class": 'button-save',
          click: this._onSelect
        }
      ]
    });
  };

  DecorationColorPicker.prototype._onDialogCreate = function() {
    this._initHexTab();
    this._initPantoneTab();
    this._initThreadTab();
  };

  DecorationColorPicker.prototype._onDialogOpen = function() {
    this._initTabs();
    this.setValue(this.options['colorType'], this.options['colorName']);
  };

  DecorationColorPicker.prototype._onDialogClose = function() {
    this.dialog.dialog('destroy').remove()
  };


  DecorationColorPicker.prototype._initTabs = function() {
    return this.dialog.tabs({
      activate: (function(_this) {
        return function(event, ui) {
          return _this.activeTab = _this.tabs[ui.newPanel.attr('id')];
        };
      })(this)
    });
  };

  DecorationColorPicker.prototype._initHexTab = function() {
    if (this.options['showHex']) {
      return this.tabs['hex'] = new HexColorPicker(this.dialog.find('#hex'));
    } else {
      return this._hideTab('hex');
    }
  };

  DecorationColorPicker.prototype._initPantoneTab = function() {
    if (this.options['showPantone']) {
      return this.tabs['pantone'] = new PantoneColorPicker(this.dialog.find('#pantone'));
    } else {
      return this._hideTab('pantone');
    }
  };

  DecorationColorPicker.prototype._initThreadTab = function() {
    if (this.options['showThreads']) {
      return this.tabs['thread'] = new ThreadColorPicker(this.dialog.find('#thread'));
    } else {
      return this._hideTab('thread');
    }
  };

  DecorationColorPicker.prototype._hideTab = function(colorType) {
    return this.dialog.find("#tab-" + colorType).hide();
  };

  DecorationColorPicker.prototype._onSelect = function() {
    this.options.callback.call(this, this.activeTab.getValue());
    return this.dialog.dialog('close');
  };

  return DecorationColorPicker;

})();

HexColorPicker = (function() {
  HexColorPicker.prototype.hintTemplate = "<div class=\"hint\">\n  Select a color from the color picker or type in the values for your color of choice.\n</div>";

  HexColorPicker.prototype.defaultValue = '#00ff00'

  function HexColorPicker(container) {
    this._onChange = bind(this._onChange, this);
    this.container = container;
    this._buildHint();
    this._initJqueryColorpicker();
  }

  HexColorPicker.prototype.getValue = function() {
    return {
      colorType: 'hex',
      colorName: this.currentValue,
      hexValue: this.currentValue,
      displayName: this.currentValue
    };
  };

  HexColorPicker.prototype.setValue = function(hexValue) {
    this.currentValue = hexValue || this.defaultValue;
    return this.container.colorpicker('setColor', this.currentValue);
  };

  HexColorPicker.prototype._buildHint = function() {
    return $(this.hintTemplate).appendTo(this.container);
  };

  HexColorPicker.prototype._initJqueryColorpicker = function() {
    return this.container.colorpicker({
      colorFormat: '#HEX',
      inline: true,
      hsv: true,
      rgb: true,
      hex: true,
      cmyk: true,
      inlineFrame: false,
      parts: ['map', 'bar', 'hex', 'hsv', 'rgb', 'cmyk', 'preview'],
      init: this._onChange,
      select: this._onChange,
      layout: {
        map: [0, 0, 5, 5],
        bar: [5, 0, 1, 5],
        preview: [6, 0, 3, 1],
        hex: [6, 2, 1, 1],
        hsv: [7, 1, 1, 1],
        rgb: [6, 1, 1, 1],
        cmyk: [8, 1, 1, 2]
      }
    });
  };

  HexColorPicker.prototype._onChange = function(event, color) {
    return this.currentValue = color.formatted;
  };

  return HexColorPicker;

})();

PantoneColorPicker = (function() {
  PantoneColorPicker.prototype.hintTemplate = "<div class=\"hint\">\n  Enter a PANTONE Number to search for the color that you are looking for.\n</div>";

  PantoneColorPicker.prototype.listTemplate = '<ul id="pantone_colors">';

  PantoneColorPicker.prototype.listItemTemplate = "<li>\n  <div class=\"color-preview\">&nbsp;</div>\n  <p class=\"color-name\"></p>\n</li>";

  PantoneColorPicker.prototype.filterTemplate = "<div id=\"pantone-filter\">\n  <label>Pantone Color</label>\n  <input>\n</div>";

  PantoneColorPicker.prototype.defaultValue = '100'

  function PantoneColorPicker(container) {
    this._filterColors = bind(this._filterColors, this);
    this.container = container;
    this.colors = window.pantone_colors || [];
    this._buildHint();
    this._buildFilter();
    this._buildList();
  }

  PantoneColorPicker.prototype.getValue = function() {
    var selected;
    selected = this.list.find('.selected');
    return {
      colorType: 'pantone',
      colorName: selected.data('code'),
      hexValue: selected.data('hex'),
      displayName: 'PMS ' + selected.data('code')
    };
  };

  PantoneColorPicker.prototype.setValue = function(pmsCode) {
    pmsCode = pmsCode || this.defaultValue
    return this.list.find("li[data-code=\"" + pmsCode + "\"]").click();
  };

  PantoneColorPicker.prototype._buildHint = function() {
    return $(this.hintTemplate).appendTo(this.container);
  };

  PantoneColorPicker.prototype._buildList = function() {
    var color, i, len, li, ref;
    this.list = $(this.listTemplate).appendTo(this.container);
    ref = this.colors;
    for (i = 0, len = ref.length; i < len; i++) {
      color = ref[i];
      li = $(this.listItemTemplate);
      li.attr('data-code', color['code']);
      li.attr('data-hex', color['hex']);
      li.find('.color-preview').css({
        'background-color': color['hex']
      });
      li.find('.color-name').text(color['code']);
      li.appendTo(this.list);
    }
    return this.list.on('click', 'li', this._onColorClick);
  };

  PantoneColorPicker.prototype._buildFilter = function() {
    var debouncedFilter;
    $(this.filterTemplate).appendTo(this.container);
    this.filter = this.container.find('#pantone-filter input');
    debouncedFilter = _.debounce(this._filterColors, 500);
    this.filter.on('keyup', debouncedFilter);
    return this.filter.on('change', debouncedFilter);
  };

  PantoneColorPicker.prototype._onColorClick = function() {
    $(this).siblings('.selected').removeClass('selected');
    return $(this).addClass('selected');
  };

  PantoneColorPicker.prototype._filterColors = function() {
    var term;
    term = this.filter.val();
    this.list.find('li.filtered').removeClass('filtered');
    if (term.length) {
      return this.list.find("li:not([data-code*=\"" + term + "\"])").addClass('filtered');
    }
  };

  return PantoneColorPicker;

})();

ThreadColorPicker = (function() {
  ThreadColorPicker.prototype.hintTemplate = "<div class=\"hint\">\n  Enter a thread number or color name to search for the color that you are looking for.\n</div>";

  ThreadColorPicker.prototype.listTemplate = '<ul id="thread_colors">';

  ThreadColorPicker.prototype.listItemTemplate = "<li>\n  <div class=\"color-preview\">&nbsp;</div>\n  <p class=\"color-name\"></p>\n</li>";

  ThreadColorPicker.prototype.filterTemplate = "<div id=\"thread-filter\">\n  <label>Thread Color</label>\n  <input>\n</div>";

  ThreadColorPicker.prototype.defaultValue = '9026'

  function ThreadColorPicker(container) {
    this._filterColors = bind(this._filterColors, this);
    this.container = container;
    this.colors = window.thread_colors || [];
    this._buildHint();
    this._buildFilter();
    this._buildList();
  }

  ThreadColorPicker.prototype.getValue = function() {
    var selected;
    selected = this.list.find('.selected');
    return {
      colorType: 'thread',
      colorName: selected.data('code'),
      hexValue: selected.data('hex'),
      displayName: 'RA #122: ' + selected.data('code')
    };
  };

  ThreadColorPicker.prototype.setValue = function(threadCode) {
    threadCode = threadCode || this.defaultValue
    return this.list.find("li[data-code=\"" + threadCode + "\"]").click();
  };

  ThreadColorPicker.prototype._buildHint = function() {
    return $(this.hintTemplate).appendTo(this.container);
  };

  ThreadColorPicker.prototype._buildList = function() {
    var color, filterString, i, len, li, ref;
    this.list = $(this.listTemplate).appendTo(this.container);
    ref = this.colors;
    for (i = 0, len = ref.length; i < len; i++) {
      color = ref[i];
      li = $(this.listItemTemplate);
      li.attr('data-code', color['code']);
      li.attr('data-hex', color['hex']);
      filterString = color['code'] + ";" + color['pantone'] + ";" + color['name'];
      li.attr('data-filter', filterString);
      li.find('.color-preview').css({
        'background-color': color['hex']
      });
      li.find('.color-name').html(this._buildColorName(color));
      li.appendTo(this.list);
    }
    return this.list.on('click', 'li', this._onColorClick);
  };

  ThreadColorPicker.prototype._buildFilter = function() {
    var debouncedFilter;
    $(this.filterTemplate).appendTo(this.container);
    this.filter = this.container.find('#thread-filter input');
    debouncedFilter = _.debounce(this._filterColors, 500);
    this.filter.on('keyup', debouncedFilter);
    return this.filter.on('change', debouncedFilter);
  };

  ThreadColorPicker.prototype._onColorClick = function() {
    $(this).siblings('.selected').removeClass('selected');
    return $(this).addClass('selected');
  };

  ThreadColorPicker.prototype._filterColors = function() {
    var term;
    term = this.filter.val();
    this.list.find('li.filtered').removeClass('filtered');
    if (term.length) {
      return this.list.find("li:not([data-filter*=\"" + term + "\"])").addClass('filtered');
    }
  };

  ThreadColorPicker.prototype._buildColorName = function(color) {
    return "RA #122: " + color['code'] + " <br/>\nPMS " + color['pantone'] + " <br/>\n" + color['name'];
  };

  return ThreadColorPicker;

})();
