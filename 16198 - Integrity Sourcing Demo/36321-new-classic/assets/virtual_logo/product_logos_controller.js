window.ProductLogosController = (function () {
  function locationIdFromSelect($select) {
    var match = ($select.attr('name') || '').match(/\[logo_location\]\[(\d+)\]/);
    return match ? match[1] : '';
  }

  function ProductLogosController(root) {
    this.$root = root ? $(root) : $(document);

    if (this.getLogoSelects().length) {
      this.bind();
    }
  }

  ProductLogosController.pending = null;

  ProductLogosController.prototype.bind = function () {
    var self = this;

    this.$root.on('click', 'button.upload-logo', function (event) {
      self.loadDialog(event);
    });
  };

  ProductLogosController.prototype.getLogoSelects = function () {
    return this.$root.find('select[data-type="virtual-logo"]');
  };

  ProductLogosController.prototype.loadDialog = function (event) {
    event.preventDefault();
    ProductLogosController.pending = this;

    $.ajax({
      url: $(event.currentTarget).data('url'),
      dataType: 'script',
    });
  };

  ProductLogosController.prototype.showDialog = function (content) {
    var self = this;

    if (!this.dialog) {
      this.dialog = $(content).dialog({
        autoOpen: false,
        draggable: false,
        resizable: false,
        modal: true,
        title: 'Upload Logo',
        width: 450,
        dialogClass: 'front-dialog logo-dialog',
        buttons: [
          {
            text: 'Cancel',
            class: 'left secondary cancel',
            click: function () {
              $(this).dialog('close');
            },
          },
          {
            text: 'Upload',
            class: 'right btn secondary',
            click: function (event) {
              self.onUploadClicked.call(self, event);
            },
          },
        ],
        close: function () {
          self.dialog.dialog('destroy');
          self.dialog.remove();
          self.dialog = null;
          ProductLogosController.pending = null;
        },
        open: function () {
          self.bindDialog();
        },
      });
    }

    this.dialog.dialog('open');
  };

  ProductLogosController.prototype.bindDialog = function () {
    var self = this;
    var uploader = this.dialog.find('#uploader');

    if (uploader.is(':data(fileupload)')) {
      uploader.fileupload('destroy');
    }

    uploader.fileupload({
      autoUpload: false,
      dataType: 'script',
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
      add: function (e, data) {
        self.dialog.data('data', data);
        self.dialog.find('.fake-file-name').text(data.files[0].name);
      },
    });
  };

  ProductLogosController.prototype.updateDialog = function (content) {
    var $content = $(content);

    $content.find('.fake-file-name').text(this.dialog.find('.fake-file-name').text());

    this.dialog.hideLoading();
    this.dialog.html($content);
    this.bindDialog();
  };

  ProductLogosController.prototype.updateLogos = function (newLogo) {
    this.dialog.hideLoading();
    this.dialog.dialog('close');
    ProductLogosController.pending = null;

    this.getLogoSelects().each(function (index, element) {
      const $select = $(element);
      const locationId = locationIdFromSelect($select);
      const locationClass = 'logo-location-button-' + locationId;
      const dataIdAttr = locationId ? ' data-id="' + locationId + '"' : '';

      $select.append(
        '<option data-image="' +
          newLogo['front_thumb_url'] +
          '" data-label="' +
          newLogo['name'] +
          '" value="' +
          newLogo['id'] +
          '">' +
          newLogo['name'] +
          '</option>'
      );

      $select.siblings('.virtual-logo-container').append(
        '<button' +
          ' class="btn p-0 logo-location-thumb border rounded ' +
          locationClass +
          '"' +
          ' type="button"' +
          ' data-value="' +
          newLogo['id'] +
          '"' +
          ' data-name="' +
          newLogo['name'] +
          '"' +
          dataIdAttr +
          '>' +
          ' <img src="' +
          newLogo['front_thumb_url'] +
          '" class="img-fluid p-2" />' +
          '</button>'
      );

      if ($select.data('select2')) {
        $select.trigger('change.select2');
      }
    });

    if (typeof bindUnselectLogo === 'function') {
      bindUnselectLogo(this.$root[0] === document ? undefined : this.$root[0]);
    }

    var previewLogo = this.$root.data('preview-logo');
    if (previewLogo && typeof previewLogo.preloadLogo === 'function') {
      if (typeof previewLogo.clearLogoCache === 'function') {
        previewLogo.clearLogoCache(newLogo['id']);
      }
      previewLogo.preloadLogo(newLogo['id']);
    }
  };

  ProductLogosController.prototype.onUploadClicked = function (event) {
    event.preventDefault();

    var data = this.dialog.data('data');

    if (data) {
      this.dialog.showLoading();
      data.form = this.dialog.find('form');
      data.submit();
    }
  };

  return ProductLogosController;
})();
