window.ProductLogosController = (function () {
  function ProductLogosController() {
    if (this.getLogoSelects().length) {
      this.bind();
    }
  }

  ProductLogosController.prototype.bind = function () {
    $(document).on('click', 'button.upload-logo', this.loadDialog);
  };

  ProductLogosController.prototype.getLogoSelects = function () {
    return $('select[data-type="virtual-logo"]');
  };

  ProductLogosController.prototype.loadDialog = function (event) {
    event.preventDefault();

    $.ajax({
      url: $(event.target).data('url'),
      dataType: 'script'
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
        title: "Upload Logo",
        width: 450,
        dialogClass: 'front-dialog logo-dialog',
        buttons: [
          {
            text: 'Cancel',
            class: 'left secondary cancel',
            click: function () {
              $(this).dialog('close');
            }
          },
          {
            text: 'Upload',
            class: 'right btn secondary',
            click: function (event) {
              self.onUploadClicked.call(self, event)
            }
          }
        ],
        close: function () {
          self.dialog.dialog('destroy');
          self.dialog.remove();
          self.dialog = null;
        },
        open: function () {
          self.bindDialog();
        }
      });
    }

    this.dialog.dialog('open');
  };

  ProductLogosController.prototype.bindDialog = function () {
    var self = this;
    var uploader = this.dialog.find("#uploader");

    if (uploader.is(":data(fileupload)")) {
      uploader.fileupload('destroy');
    }

    uploader.fileupload({
      autoUpload: false,
      dataType: 'script',
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
      add: function (e, data) {
        self.dialog.data('data', data);
        self.dialog.find('.fake-file-name').text(data.files[0].name)
      }
    });
  };

  ProductLogosController.prototype.updateDialog = function (content) {
    var $content = $(content);

    $content.find('.fake-file-name').text(
      this.dialog.find('.fake-file-name').text()
    );

    this.dialog.hideLoading();
    this.dialog.html($content);
    this.bindDialog();
  };

  ProductLogosController.prototype.updateLogos = function (newLogo) {
    this.dialog.hideLoading();
    this.dialog.dialog('close');

    this.getLogoSelects().each(function (index, element) {
      const $select = $(element);

      $select.append(
        `<option data-image="${newLogo["front_thumb_url"]}" value="${newLogo["id"]}">${newLogo["name"]}</option>`
      );

      $select.siblings(".virtual-logo-container").append(
        `<button
          class="btn p-0 logo-location-thumb border rounded logo-location-button-${newLogo["id"]}"
          type="button"
          data-value="${newLogo["id"]}"
          data-name="${newLogo["name"]}"
        >
         <img src="${newLogo["front_thumb_url"]}" class="img-fluid p-2" />
        </button>`
      );
    });

    bindUnselectLogo();
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
