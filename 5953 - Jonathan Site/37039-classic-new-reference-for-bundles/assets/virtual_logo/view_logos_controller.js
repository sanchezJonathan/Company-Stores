(function () {
  function PreviewRequestManager(deps) {
    this._xhr = null;
    this._generation = 0;
    this._deps = deps;
  }

  PreviewRequestManager.prototype.cancel = function () {
    if (this._xhr) {
      this._xhr.abort();
      this._xhr = null;
    }
    this._deps.$previewArea.hideLoading();
  };

  PreviewRequestManager.prototype.request = function (productImageId, logoId) {
    var self = this;
    var deps = this._deps;

    this.cancel();

    if (!deps.applyLogoUrl || !productImageId || !logoId) {
      return;
    }

    var gen = ++this._generation;
    deps.$previewArea.showLoading();

    this._xhr = $.ajax({
      type: 'POST',
      url: deps.applyLogoUrl,
      dataType: 'json',
      timeout: 30000,
      data: {
        type: 'front',
        product_image_id: productImageId,
        logo_id: logoId
      }
    })
      .done(function (response) {
        if (gen !== self._generation) {
          return;
        }
        if (response && response.image_src) {
          try {
            deps.onPreviewUrl(response.image_src);
          } catch (_error) {
            deps.$previewArea.hideLoading();
          }
        } else {
          deps.$previewArea.hideLoading();
        }
      })
      .fail(function (_jqXHR, status) {
        if (status === 'abort' || gen !== self._generation) {
          return;
        }
        deps.$previewArea.hideLoading();
      })
      .always(function () {
        if (gen === self._generation) {
          self._xhr = null;
        }
      });
  };

  function ViewLogosController(dialogContent, productName, enableCustomUpload, root) {
    BaseVirtualLogo.call(this, dialogContent, productName);
    this.$root = $(root);
    this.newLogoUrl = this.$root.data('newLogoUrl');
    this.applyLogoUrl = this.$root.data('applyLogoUrl');
    this.enableCustomUpload = enableCustomUpload != null ? enableCustomUpload : true;
    this.previewManager = null;
    this.uploadController = null;
    this.initialize();
  }

  ViewLogosController.prototype = Object.create(BaseVirtualLogo.prototype);
  ViewLogosController.prototype.constructor = ViewLogosController;

  ViewLogosController.prototype.additionalOptions = function () {
    return {
      dialog: {
        dialogClass: 'view-logos',
        baseDialogClass: 'front-dialog',
        minHeight: 380,
        width: 920
      },
      classes: {
        dialog: 'view-logos',
        frontDialog: 'front-dialog',
        selectedImage: 'selected',
        imageWrapper: 'image-wrapper',
        logo: 'website_logo'
      },
      selectors: {
        label: 'div.view-logo-label',
        previewImageArea: '.logo-preview-area',
        previewImageWrapper: '.logo-preview-area .image-wrapper',
        previewImage: '.logo-preview-area .image-wrapper img',
        imagesWrapper: 'div.items',
        logosContainer: 'div.logo-images.logos',
        productImagesContainer: 'div.logo-images.product-images',
        deleteLogo: 'a.delete-image'
      }
    };
  };

  ViewLogosController.prototype.scrollingIdPrefix = function (suffix) {
    return suffix + '_' + this.$root.data('viewLogosScopeId');
  };

  ViewLogosController.prototype.initialize = function () {
    this.bindLabelClickAction();
    this.prepareLogosController();
  };

  ViewLogosController.prototype.bindLabelClickAction = function () {
    var self = this;
    this.$root.find('.view-logo-label').off('click.viewLogos').on('click.viewLogos', function () {
      self.prepareDialog();
    });
  };

  ViewLogosController.prototype.prepareDialog = function (dialogContent) {
    var self = this;
    var options = self.options;

    if (dialogContent) {
      self.dialog = $(dialogContent);
    }

    if (!self.dialog.is(':data(dialog)')) {
      self.dialog = self.dialog.dialog({
        autoOpen: false,
        draggable: false,
        resizable: false,
        closeOnEscape: true,
        modal: true,
        stack: false,
        appendTo: 'body',
        minHeight: options.dialog.minHeight,
        width: options.dialog.width,
        title: self._dialogTitle(),
        dialogClass: self._dialogClass(),
        create: function () {
          self._onDialogCreate();
        },
        open: function () {
          self._onDialogOpen();
        },
        close: function () {
          self._onDialogClose();
        }
      });
    }

    return self.dialog.dialog('open');
  };

  ViewLogosController.prototype._onDialogCreate = function () {
    var self = this;

    if (!self.enableCustomUpload) {
      return;
    }

    self.dialog.dialog('option', 'buttons', [
      {
        text: 'Upload New Logo',
        class: 'center-btn btn secondary',
        click: function () {
          if (!self.newLogoUrl) {
            return;
          }

          AccountLogosController.pending = self.uploadController;

          $.ajax({ url: self.newLogoUrl, dataType: 'script' });
        }
      }
    ]);
  };

  ViewLogosController.prototype._onDialogOpen = function () {
    var self = this;
    var options = self.options;

    self.$productImagesColumn = self.dialog.find(options.selectors.productImagesContainer);
    self.$logosColumn = self.dialog.find(options.selectors.logosContainer);
    self.$previewArea = self.dialog.find(options.selectors.previewImageArea);
    self.$previewArea.hideLoading();

    if (!self.previewManager) {
      self.previewManager = new PreviewRequestManager({
        $previewArea: self.$previewArea,
        applyLogoUrl: self.applyLogoUrl,
        onPreviewUrl: function (src) {
          self._updatePreviewImage(src);
        }
      });
    }

    self.dialog.off('.viewLogos');
    self._bindSelectionHandlers();
    self._bindDeleteHandler();
    self._bindScrollingToProductImages();
    self._bindScrollingToLogos();
    self._autoSelectDefaults();

    window.setTimeout(function () {
      self.syncPreview();
    }, 0);
  };

  ViewLogosController.prototype._onDialogClose = function () {
    if (this._previewLoadTimeout) {
      window.clearTimeout(this._previewLoadTimeout);
      this._previewLoadTimeout = null;
    }
    if (this.previewManager) {
      this.previewManager.cancel();
    }
    this.dialog.off('.viewLogos');
  };

  ViewLogosController.prototype._dialogTitle = function () {
    return $('<span/>').html('View ' + this.productName + ' logos').text();
  };

  ViewLogosController.prototype._bindSelectionHandlers = function () {
    var self = this;
    var options = self.options;
    var wrapperSelector = '.' + options.classes.imageWrapper;

    self.dialog.on('click.viewLogos', options.selectors.productImagesContainer + ' ' + wrapperSelector, function (event) {
      event.preventDefault();
      self._selectThumbnail($(this), self.$productImagesColumn);
      self.syncPreview();
    });

    self.dialog.on('click.viewLogos', options.selectors.logosContainer + ' ' + wrapperSelector, function (event) {
      event.preventDefault();
      self._selectThumbnail($(this), self.$logosColumn);
      self.syncPreview();
    });
  };

  ViewLogosController.prototype._selectThumbnail = function ($wrapper, $column) {
    var selectedClass = this.options.classes.selectedImage;
    var wrapperClass = this.options.classes.imageWrapper;

    $column.find('.' + wrapperClass + '.' + selectedClass).removeClass(selectedClass);
    $wrapper.addClass(selectedClass);
  };

  ViewLogosController.prototype._getSelectedIn = function ($column) {
    var options = this.options;
    var item = _.first($column.find('.' + options.classes.imageWrapper + '.' + options.classes.selectedImage));
    return item ? $(item) : null;
  };

  ViewLogosController.prototype._getFirstIn = function ($column) {
    var options = this.options;
    var item = _.first($column.find('.' + options.classes.imageWrapper));
    return item ? $(item) : null;
  };

  ViewLogosController.prototype._getSelectedIds = function () {
    var selectedProductImage = this._getSelectedIn(this.$productImagesColumn);
    var selectedLogo = this._getSelectedIn(this.$logosColumn);

    return {
      productImageId: selectedProductImage ? selectedProductImage.attr('data-id') : null,
      logoId: selectedLogo ? selectedLogo.attr('data-id') : null
    };
  };

  ViewLogosController.prototype.syncPreview = function () {
    var ids = this._getSelectedIds();

    if (ids.productImageId && ids.logoId) {
      this.previewManager.request(ids.productImageId, ids.logoId);
    } else if (this.previewManager) {
      this.previewManager.cancel();
    }
  };

  ViewLogosController.prototype._autoSelectDefaults = function () {
    if (!this._getSelectedIn(this.$productImagesColumn)) {
      var firstProductImage = this._getFirstIn(this.$productImagesColumn);
      if (firstProductImage) {
        this._selectThumbnail(firstProductImage, this.$productImagesColumn);
      }
    }

    if (!this._getSelectedIn(this.$logosColumn)) {
      var firstLogo = this._getFirstIn(this.$logosColumn);
      if (firstLogo) {
        this._selectThumbnail(firstLogo, this.$logosColumn);
      }
    }
  };

  ViewLogosController.prototype._updatePreviewImage = function (imageSrc) {
    var $previewArea = this.$previewArea;
    var $previewImage = this.dialog.find(this.options.selectors.previewImage);
    var previewEl = $previewImage[0];
    var self = this;

    function finishLoading() {
      if (self._previewLoadTimeout) {
        window.clearTimeout(self._previewLoadTimeout);
        self._previewLoadTimeout = null;
      }
      $previewArea.hideLoading();
    }

    if (!previewEl || !imageSrc) {
      finishLoading();
      return;
    }

    $previewImage.off('load.viewLogos error.viewLogos');
    $previewImage.one('load.viewLogos error.viewLogos', finishLoading);

    self._previewLoadTimeout = window.setTimeout(finishLoading, 15000);

    if ($previewImage.attr('src') === imageSrc && previewEl.complete) {
      finishLoading();
      return;
    }

    $previewImage.attr('src', imageSrc);

    if (previewEl.complete) {
      finishLoading();
    }
  };

  ViewLogosController.prototype._resetPreviewToStaticProductImage = function () {
    var selectedProductImage = this._getSelectedIn(this.$productImagesColumn);

    if (selectedProductImage) {
      this.dialog.find(this.options.selectors.previewImage).attr('src', selectedProductImage.data('image'));
    }
  };

  ViewLogosController.prototype._bindScrollingToProductImages = function () {
    var options = this.options;

    this._bindVerticalScrolling(this.$productImagesColumn, {
      container: this.$productImagesColumn,
      navButtonsIdsPrefix: this.scrollingIdPrefix('product_images'),
      itemsSelector: options.selectors.imagesWrapper,
      itemSelector: '.' + options.classes.imageWrapper
    });
  };

  ViewLogosController.prototype._bindScrollingToLogos = function () {
    var self = this;
    var options = this.options;

    this._bindVerticalScrolling(this.$logosColumn, {
      container: this.$logosColumn,
      navButtonsIdsPrefix: this.scrollingIdPrefix('logos'),
      itemsSelector: options.selectors.imagesWrapper,
      itemSelector: '.' + options.classes.imageWrapper,
      addItem: function (logo) {
        self._selectThumbnail($(logo), self.$logosColumn);
        self.syncPreview();
      }
    });
  };

  ViewLogosController.prototype._bindDeleteHandler = function () {
    var self = this;
    var options = this.options;

    this.dialog.on('click.viewLogos', options.selectors.deleteLogo, function (event) {
      var $deleteLink = $(this);
      var url = $deleteLink.attr('href');
      var $logoWrapper = $deleteLink.closest('.' + options.classes.imageWrapper);
      var wasSelected = $logoWrapper.hasClass(options.classes.selectedImage);

      event.preventDefault();

      $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: { _method: 'delete' },
        success: function () {
          var scrollable = self.$logosColumn.data('scrollable');

          if (scrollable) {
            scrollable.deleteItem($logoWrapper);
          } else {
            $logoWrapper.remove();
          }

          if (wasSelected) {
            var firstRemaining = self._getFirstIn(self.$logosColumn);
            if (firstRemaining) {
              self._selectThumbnail(firstRemaining, self.$logosColumn);
              self.syncPreview();
            } else {
              self.previewManager.cancel();
              self._resetPreviewToStaticProductImage();
            }
          }
        }
      });
    });
  };

  ViewLogosController.prototype.prepareLogosController = function () {
    var self = this;

    function UploadBridgeController() {}

    UploadBridgeController.prototype = Object.create(AccountLogosController.prototype);
    UploadBridgeController.prototype.constructor = UploadBridgeController;
    UploadBridgeController.prototype.initialize = function () {};
    UploadBridgeController.prototype.onCreateAction = function (isValid, formContent, logoJson, logoHtml) {
      if (isValid) {
        self.addUploadedLogo(logoHtml);
        this._closeDialog();
      } else {
        this.updateDialogForm(formContent);
      }
    };

    this.uploadController = new UploadBridgeController();
  };

  ViewLogosController.prototype.addUploadedLogo = function (logoHtml) {
    var $logo = $(logoHtml);
    var scrollable = this.$logosColumn && this.$logosColumn.data('scrollable');

    if (!scrollable) {
      return;
    }

    scrollable.addItem($logo);
  };

  window.ViewLogosController = ViewLogosController;
})();
