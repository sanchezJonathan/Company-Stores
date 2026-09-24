(function () {
  'use strict';

  var dom = {
    showFlex: function (el) {
      if (!el) return;
      el.classList.remove('d-none');
      el.classList.add('d-flex');
      el.removeAttribute('hidden');
    },

    hideEl: function (el) {
      if (!el) return;
      el.classList.add('d-none');
      el.classList.remove('d-flex');
      el.setAttribute('hidden', '');
    },

    showBlock: function (el) {
      if (!el) return;
      el.classList.remove('d-none');
      el.removeAttribute('hidden');
    },

    showPanel: function (el) {
      if (!el) return;
      el.classList.remove('d-none');
      el.removeAttribute('hidden');
    },

    hidePanel: function (el) {
      if (!el) return;
      el.classList.add('d-none');
      el.setAttribute('hidden', '');
    },

    isVisible: function (el) {
      return el && !el.classList.contains('d-none') && !el.hidden;
    },
  };

  var select2Helpers = {
    shouldValidateSelect: function (select) {
      if (select.offsetParent !== null) return true;
      return (
        select.classList.contains('select2-hidden-accessible') || select.classList.contains('d-none')
      );
    },

    syncSelectValidation: function (select) {
      var container = select.nextElementSibling;
      if (container && container.classList.contains('select2')) {
        container.classList.toggle('is-invalid', select.classList.contains('is-invalid'));
        return;
      }

      if (select.classList.contains('d-none')) {
        var selectArea = select.closest('.select-area');
        if (!selectArea) return;

        var hint = selectArea.querySelector('.logo-location-text, [class*="product-option-text-"]');
        if (hint) {
          hint.classList.toggle('is-invalid', select.classList.contains('is-invalid'));
        }
      }
    },

    refreshRowSelects: function (row) {
      if (typeof $ === 'undefined') return;

      row.querySelectorAll('select.select2-hidden-accessible').forEach(function (select) {
        var $select = $(select);
        if ($select.data('select2')) {
          $select.trigger('change.select2');
        }
      });
    },
  };

  var memberValidation = {
    toggleProofApprovalError: function (input, shouldShow) {
      if (!input) return;

      var wrapper = input.closest('.proof-approval');
      var message = wrapper && wrapper.querySelector('.proof-approval-message');

      input.classList.toggle('is-invalid', shouldShow);

      if (!message) return;

      if (shouldShow) {
        dom.showBlock(message);
      } else {
        dom.hideEl(message);
      }
    },

    validateRow: function (row) {
      var valid = true;
      var expanded = row.querySelector('.bundle-member-expanded');

      expanded.querySelectorAll('select').forEach(function (select) {
        if (!select2Helpers.shouldValidateSelect(select)) return;

        var wrapper = select.closest('.product-option-wrapper, .form-item, .logo-info');
        var required = wrapper && wrapper.querySelector('.required-label');
        if (required && !select.value) {
          select.classList.add('is-invalid');
          valid = false;
        } else {
          select.classList.remove('is-invalid');
        }

        select2Helpers.syncSelectValidation(select);
      });

      expanded.querySelectorAll('input[type="text"], textarea').forEach(function (input) {
        if (input.offsetParent === null) return;
        var label = expanded.querySelector('label[for="' + input.id + '"]');
        var required = label && label.textContent.indexOf('*') >= 0;
        if (required && !input.value.trim()) {
          input.classList.add('is-invalid');
          valid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });

      expanded.querySelectorAll('input.proof-approval-checkbox').forEach(function (input) {
        if (input.offsetParent === null) return;

        var missingApproval = !input.checked;
        memberValidation.toggleProofApprovalError(input, missingApproval);
        if (missingApproval) valid = false;
      });

      return valid;
    },

    writeSummary: function (row) {
      var parts = [];
      var expanded = row.querySelector('.bundle-member-expanded');

      expanded.querySelectorAll('select[data-type="product-option"]').forEach(function (select) {
        var label = select.dataset.name || select.getAttribute('data-name');
        var option = select.options[select.selectedIndex];
        if (option && option.value) {
          var labelText = (label || 'Option').trim();
          var valueText = (option.dataset.label || option.text).trim();
          parts.push('<span class="bundle-member-option-label">' + labelText + ':</span> ' + valueText);
        }
      });

      expanded.querySelectorAll('select[data-type="virtual-logo"]').forEach(function (select) {
        var option = select.options[select.selectedIndex];
        if (option && option.value) {
          var wrapper = select.closest('.logo-info, .product-option-wrapper');
          var labelEl = wrapper && wrapper.querySelector('label');
          var labelText = 'Logo';

          if (labelEl) {
            var labelClone = labelEl.cloneNode(true);
            var required = labelClone.querySelector('.required-label');
            if (required) required.remove();
            labelText = labelClone.textContent.trim() || labelText;
          }

          parts.push(
            '<span class="bundle-member-option-label">' +
              labelText +
              ':</span> ' +
              (option.dataset.label || option.text).trim()
          );
        }
      });

      var summaryEl = row.querySelector('.bundle-member-summary');
      if (summaryEl) {
        summaryEl.innerHTML = parts.join('  ');
      }
    },
  };

  var memberStock = {
    updateStock: function (row, variant, allowStockNotification) {
      var stockSpan = row.querySelector('.bundle-member-stock');
      if (!stockSpan) return;

      var expanded = row.querySelector('.bundle-member-expanded');
      if (expanded) {
        expanded.querySelectorAll('.out-of-stock-notification').forEach(function (el) {
          el.remove();
        });
      }

      stockSpan.classList.remove('text-success', 'text-warning', 'text-danger', 'd-none');

      stockSpan.textContent = variant.stock_message;

      switch (variant.stock_state) {
        case 'in_stock':
        case 'low_stock':
          stockSpan.classList.add('text-success');
          break;
        case 'out_of_stock':
          if (variant.allow_negative) {
            stockSpan.classList.add('text-warning');
          } else {
            stockSpan.classList.add('text-danger');
            if (allowStockNotification) {
              memberStock.addStockNotificationButton(stockSpan);
            }
          }
          break;
        default:
          stockSpan.classList.add('d-none');
      }
    },

    addStockNotificationButton: function (stockSpan) {
      // In stock notifications are not supported for bundles yet
    },
  };

  function BundleGallery(page, getMode) {
    this.page = page;
    this.getMode = getMode;
    this.panels = Array.from(page.querySelectorAll('.bundle-gallery-panel:not(.bundle-gallery-panel--summary)'));
    this.summaryPanel = page.querySelector('.bundle-gallery-panel--summary');
    this.activeProductId = null;
    this.initSummaryScrolling();
    this.bindEvents();
  }

  BundleGallery.prototype.previewScopeForPanel = function (panel) {
    var self = this;

    return ProductPreviewScope.forGalleryPanel(panel, {
      galleryInteractionEnabled: function () {
        return self.getMode() === 'configuring';
      },
      galleryVisible: function () {
        return !panel.classList.contains('d-none') && !panel.hidden;
      },
    });
  };

  BundleGallery.prototype.summaryItemWidth = function () {
    var viewportSize = window.innerWidth || document.documentElement.clientWidth;

    if (viewportSize >= 1200) return 208;
    if (viewportSize >= 992) return 158;
    if (viewportSize >= 768) return 117;
    if (viewportSize >= 576) return 143;
    if (viewportSize >= 451) return 110;
    return 68;
  };

  BundleGallery.prototype.initSummaryScrolling = function () {
    if (!this.summaryPanel || typeof HorizontalScrolling !== 'function' || typeof $ === 'undefined') {
      return;
    }

    var imagesWrapper = this.summaryPanel.querySelector('.images-wrapper');
    var summaryImages = this.summaryPanel.querySelector('ul.bundle-summary-images');
    var prevButton = this.summaryPanel.querySelector('button.bundle-summary-nav.prev');
    var nextButton = this.summaryPanel.querySelector('button.bundle-summary-nav.next');

    if (!imagesWrapper || !summaryImages || !prevButton || !nextButton) return;

    summaryImages.style.left = '0px';
    $(imagesWrapper).data(
      'scrolling',
      new HorizontalScrolling({
        containerSelector: '.bundle-gallery-panel--summary ul.bundle-summary-images',
        itemClass: 'image',
        displayedCount: 3,
        itemWidth: this.summaryItemWidth(),
        prevButtonSelector: '.bundle-gallery-panel--summary button.bundle-summary-nav.prev',
        nextButtonSelector: '.bundle-gallery-panel--summary button.bundle-summary-nav.next',
      })
    );
  };

  BundleGallery.prototype.panelForProductId = function (productId) {
    return this.panels.find(function (panel) {
      return panel.dataset.bundleProductId === productId;
    });
  };

  BundleGallery.prototype.storeMainImage = function (panel) {
    this.previewScopeForPanel(panel).storeMainImage();
  };

  BundleGallery.prototype.changePrimaryImage = function (panel, imageUrl) {
    this.previewScopeForPanel(panel).changePrimaryImage(imageUrl);
  };

  BundleGallery.prototype.revertMainImage = function (panel) {
    this.previewScopeForPanel(panel).revertMainImage();
  };

  BundleGallery.prototype.initZoom = function (panel) {
    this.previewScopeForPanel(panel).initZoom();
  };

  BundleGallery.prototype.showProduct = function (productId) {
    var self = this;
    this.activeProductId = productId;

    this.panels.forEach(function (panel) {
      if (panel.dataset.bundleProductId === productId) {
        dom.showPanel(panel);
      } else {
        dom.hidePanel(panel);
      }
    });

    var activePanel = this.panelForProductId(productId);
    if (activePanel && dom.isVisible(activePanel)) {
      this.storeMainImage(activePanel);
      this.initZoom(activePanel);
    }
  };

  BundleGallery.prototype.enterSummaryMode = function () {
    var self = this;

    this.panels.forEach(function (panel) {
      dom.hidePanel(panel);
      var img = self.previewScopeForPanel(panel).primaryImg();
      if (img && typeof removeElevateZoomFor === 'function') {
        removeElevateZoomFor($(img));
      }
    });

    if (this.summaryPanel) {
      dom.showPanel(this.summaryPanel);
      this.storeMainImage(this.summaryPanel);
    }
  };

  BundleGallery.prototype.exitSummaryMode = function () {
    if (this.summaryPanel) dom.hidePanel(this.summaryPanel);
    if (this.activeProductId) this.showProduct(this.activeProductId);
  };

  BundleGallery.prototype.bindEvents = function () {
    var self = this;

    if (this.summaryPanel) {
      this.summaryPanel.querySelectorAll('.images-container .image a').forEach(function (link) {
        link.addEventListener('mouseenter', function () {
          if (self.getMode() !== 'summary') return;
          self.previewImage(
            self.summaryPanel,
            link.getAttribute('href'),
            link.closest('.image').dataset.id
          );
        });
        link.addEventListener('mouseleave', function () {
          if (self.getMode() !== 'summary') return;
          self.revertMainImage(self.summaryPanel);
        });
      });
    }
  };

  BundleGallery.prototype.previewImage = function (panel, href, imageId) {
    var scope = this.previewScopeForPanel(panel);
    scope.storeMainImage();
    scope.changePrimaryImage(href);
    if (imageId) scope.setMainImageId(imageId);
  };

  function BundlePricing(page, form, bundleId, members, allowStockNotification) {
    this.page = page;
    this.form = form;
    this.bundleId = bundleId;
    this.members = members;
    this.allowStockNotification = allowStockNotification;
    this.memberPrices = new Map();
    this.priceUpdateTimeout = null;
    this.priceFormatSample = null;
  }

  BundlePricing.prototype.init = function () {
    var self = this;

    this.members.forEach(function (member) {
      var lineTotal = parseFloat(member.row.dataset.lineTotal, 10);
      if (!isNaN(lineTotal)) {
        self.memberPrices.set(member.productId, lineTotal);
      }
    });

    this.updateBundleTotal();
    this.members.forEach(function (member) {
      self.fetchMember(member);
    });
  };

  BundlePricing.prototype.scheduleUpdate = function (member) {
    var self = this;

    if (this.priceUpdateTimeout) {
      clearTimeout(this.priceUpdateTimeout);
    }

    this.priceUpdateTimeout = setTimeout(function () {
      self.fetchMember(member);
    }, 100);
  };

  BundlePricing.prototype.serializeMemberAsProduct = function (bundleProductId) {
    var parts = ['bundle_id=' + encodeURIComponent(this.bundleId)];
    var prefix = 'bundle[products][' + bundleProductId + ']';

    Array.from(this.form.elements).forEach(function (el) {
      if (!el.name || el.name.indexOf(prefix) !== 0) return;
      if (el.disabled) return;
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;

      var productName = 'product' + el.name.slice(prefix.length);
      parts.push(encodeURIComponent(productName) + '=' + encodeURIComponent(el.value));
    });

    return parts.join('&');
  };

  BundlePricing.prototype.fetchMember = function (member) {
    var self = this;
    var bundleProductId = member.productId;
    var url = member.row.dataset.calculatePricesUrl;

    if (!url || !this.bundleId || !bundleProductId || typeof $ === 'undefined') return;

    $.ajax({
      url: url + '.json',
      type: 'POST',
      dataType: 'json',
      data: this.serializeMemberAsProduct(bundleProductId),
    }).done(function (data) {
      self.applyMemberPrice(member, data);
    });
  };

  BundlePricing.prototype.applyMemberPrice = function (member, data) {
    var row = member.row;
    var bundleProductId = member.productId;
    var priceText = data.unit_price_display || '';

    row.querySelectorAll('.bundle-member-price').forEach(function (el) {
      el.textContent = priceText;
    });

    var itemPriceEl = row.querySelector('.bundle-member-item-price');
    if (itemPriceEl) {
      itemPriceEl.textContent = priceText;
    }

    if (bundleProductId && data.line_total != null) {
      this.memberPrices.set(bundleProductId, parseFloat(data.line_total, 10));
      row.dataset.lineTotal = String(data.line_total);
    }

    if (!this.priceFormatSample && data.line_total_display) {
      this.priceFormatSample = data.line_total_display;
    }

    if (data.variants && data.variants.length > 0) {
      memberStock.updateStock(row, data.variants[0], this.allowStockNotification);
    }

    this.updateBundleTotal();
  };

  BundlePricing.prototype.updateBundleTotal = function () {
    var total = 0;

    this.memberPrices.forEach(function (value) {
      if (!isNaN(value)) total += value;
    });

    var totalEl = this.page.querySelector('.bundle-total-price');
    if (!totalEl) return;

    if (totalEl.dataset.initialDisplay && this.memberPrices.size === 0) {
      return;
    }

    if (typeof totalEl.dataset.rawTotal === 'undefined') {
      totalEl.dataset.initialDisplay = totalEl.textContent;
    }

    totalEl.dataset.rawTotal = String(total);
    totalEl.textContent = this.formatDisplayTotal(total);
  };

  BundlePricing.prototype.formatDisplayTotal = function (total) {
    if (this.priceFormatSample && this.priceFormatSample.indexOf('$') === 0) {
      return '$' + total.toFixed(2);
    }

    return String(Math.ceil(total));
  };

  function BundleMemberController(row, callbacks) {
    this.row = row;
    this.productId = row.dataset.bundleProductId;
    this.callbacks = callbacks;
    this.bindEvents();
  }

  BundleMemberController.prototype.completeButton = function () {
    return this.row.querySelector('.bundle-member-toggle--complete');
  };

  BundleMemberController.prototype.incompleteButton = function () {
    return this.row.querySelector('button.bundle-member-incomplete');
  };

  BundleMemberController.prototype.expandedArea = function () {
    return this.row.querySelector('.bundle-member-expanded');
  };

  BundleMemberController.prototype.isComplete = function () {
    return this.row.classList.contains('bundle-member--complete');
  };

  BundleMemberController.prototype.isInvalid = function () {
    return this.row.dataset.hasErrors === 'true';
  };

  BundleMemberController.prototype.isExpanded = function () {
    return dom.isVisible(this.expandedArea());
  };

  BundleMemberController.prototype.setRowState = function (state) {
    this.row.classList.remove('bundle-member--incomplete', 'bundle-member--expanded', 'bundle-member--complete');
    this.row.classList.add('bundle-member--' + state);
  };

  BundleMemberController.prototype.setToggleExpanded = function (expanded) {
    var completeBtn = this.completeButton();
    var incompleteBtn = this.incompleteButton();

    [completeBtn, incompleteBtn].forEach(function (btn) {
      if (btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  };

  BundleMemberController.prototype.markComplete = function () {
    this.row.dataset.wasComplete = 'true';
    this.setRowState('complete');
    this.setToggleExpanded(false);
    dom.hideEl(this.expandedArea());
    dom.hideEl(this.incompleteButton());
    dom.showFlex(this.completeButton());
  };

  BundleMemberController.prototype.showIncomplete = function () {
    this.row.dataset.wasComplete = 'false';
    this.setRowState('incomplete');
    this.setToggleExpanded(false);
    dom.hideEl(this.expandedArea());
    dom.hideEl(this.completeButton());
    dom.showFlex(this.incompleteButton());
  };

  BundleMemberController.prototype.expand = function (wasComplete) {
    this.row.dataset.wasComplete = wasComplete ? 'true' : 'false';

    dom.hideEl(this.completeButton());
    dom.hideEl(this.incompleteButton());
    dom.showBlock(this.expandedArea());
    this.setRowState(wasComplete ? 'complete' : 'expanded');
    this.setToggleExpanded(true);

    var saveBtn = this.row.querySelector('.bundle-save-btn');
    if (saveBtn) {
      saveBtn.textContent = wasComplete ? 'Save Changes' : 'Save and Continue';
    }

    select2Helpers.refreshRowSelects(this.row);

    if (this.callbacks.onExpand) {
      this.callbacks.onExpand(this.productId);
    }
  };

  BundleMemberController.prototype.collapse = function () {
    dom.hideEl(this.expandedArea());
    this.setToggleExpanded(false);

    if (this.isComplete()) {
      dom.showFlex(this.completeButton());
      dom.hideEl(this.incompleteButton());
      this.setRowState('complete');
    } else {
      dom.hideEl(this.completeButton());
      dom.showFlex(this.incompleteButton());
      this.setRowState('incomplete');
    }
  };

  BundleMemberController.prototype.save = function () {
    if (!memberValidation.validateRow(this.row)) return;

    var saveBtn = this.row.querySelector('.bundle-save-btn');
    var isSaveChanges = saveBtn && saveBtn.textContent === 'Save Changes';

    memberValidation.writeSummary(this.row);
    this.setRowState('complete');
    this.row.dataset.wasComplete = 'true';
    this.collapse();

    if (this.callbacks.onSaved) {
      this.callbacks.onSaved(this, isSaveChanges);
    }
  };

  BundleMemberController.prototype.bindEvents = function () {
    var self = this;
    var completeBtn = this.completeButton();
    var incompleteBtn = this.incompleteButton();

    if (completeBtn) {
      completeBtn.addEventListener('click', function () {
        if (self.callbacks.onRequestExpand) {
          self.callbacks.onRequestExpand(self, true);
        }
      });
    }

    if (incompleteBtn) {
      incompleteBtn.addEventListener('click', function () {
        if (self.callbacks.onRequestExpand) {
          self.callbacks.onRequestExpand(self, false);
        }
      });
    }

    var saveBtn = this.row.querySelector('.bundle-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        self.save();
      });
    }

    this.row.querySelectorAll('input.proof-approval-checkbox').forEach(function (input) {
      input.addEventListener('change', function () {
        memberValidation.toggleProofApprovalError(input, !input.checked);
      });
    });
  };

  function BundleMemberPreview(row, panel, gallery, serializeMember, isPreviewEnabled) {
    this.row = row;
    this.panel = panel;
    this.gallery = gallery;
    this.bundleProductId = row.dataset.bundleProductId;
    this.productId = row.dataset.productId;
    this.virtualSamples = row.dataset.virtualSamples === 'true';
    this.virtualLogos = row.dataset.virtualLogos === 'true';
    this.isPreviewEnabled = isPreviewEnabled || function () {
      return true;
    };

    if (!this.productId || typeof PreviewLogo !== 'function') return;

    var self = this;

    this.previewLogo = new PreviewLogo(this.productId, {
      galleryRoot: panel,
      configRoot: row,
      changePrimaryImage: function (url) {
        gallery.changePrimaryImage(panel, url);
      },
    });

    $(row).data('preview-logo', this.previewLogo);

    if (this.virtualSamples) {
      this.bindUpdatePreview(serializeMember);
    } else if (this.virtualLogos) {
      this.bindLogosPreview();
    }
  }

  BundleMemberPreview.prototype.bindLogosPreview = function () {
    var self = this;
    var $row = $(this.row);

    $row.find('select[data-type="virtual-logo"]').on('change', function () {
      if (!self.isPreviewEnabled()) return;

      var logoId = this.value;
      if (!logoId) return;

      self.previewLogo.applyLogo(logoId);
      self.gallery.storeMainImage(self.panel);
    });

    $row.find('select[data-type="virtual-logo"] option').each(function () {
      var logoId = $(this).val();
      if (logoId) self.previewLogo.preloadLogo(logoId);
    });
  };

  BundleMemberPreview.prototype.bindUpdatePreview = function (serializeMember) {
    var self = this;

    $(this.row).find('button.update-preview').on('click', function (event) {
      event.preventDefault();
      if (!self.isPreviewEnabled()) return;

      var url = $(event.currentTarget).data('url');
      var $panel = $(self.panel);

      $panel.showLoading({
        overlayZIndex: 1000,
        indicatorZIndex: 1001,
      });

      $.ajax({
        url: url,
        type: 'POST',
        data: serializeMember(self.bundleProductId),
        dataType: 'json',
      })
        .done(function (data) {
          self.previewLogo.update(data);
          self.gallery.storeMainImage(self.panel);
        })
        .always(function () {
          $panel.hideLoading();
        });
    });
  };

  function BundlePage(page) {
    var self = this;

    this.page = page;
    this.memberCount = parseInt(page.dataset.memberCount, 10) || 0;
    this.mode = page.dataset.mode || 'configuring';
    this.activeProductId = null;
    this.bundleId = page.dataset.bundleId;
    this.allowStockNotification = page.dataset.allowStockNotification === 'true';
    this.subtitleText = page.querySelector('.bundle-subtitle-text');
    this.progressCurrent = page.querySelector('.bundle-progress-current');
    this.ctaButtons = Array.from(page.querySelectorAll('.bundle-footer input[type="submit"]'));
    this.form = page.querySelector('form.edit_website_bundle');

    this.gallery = new BundleGallery(page, function () {
      return self.mode;
    });

    var memberCallbacks = {
      onRequestExpand: function (member, wasComplete) {
        self.expandMember(member, wasComplete);
      },
      onExpand: function (productId) {
        self.activeProductId = productId;
        self.gallery.showProduct(productId);
        self.updateProgress();
      },
      onSaved: function (member, isSaveChanges) {
        self.advanceAfterSave(member, isSaveChanges);
      },
    };

    this.members = Array.from(page.querySelectorAll('.bundle-member-row')).map(function (row) {
      return new BundleMemberController(row, memberCallbacks);
    });

    this.pricing = new BundlePricing(page, this.form, this.bundleId, this.members, this.allowStockNotification);

    this.bindMemberImagePreviews();
    this.bindMemberPreviews();
    this.bindMemberLogoFeatures();
    this.bindFormEvents();
    this.initializeFromServer();
    this.pricing.init();
  }

  BundlePage.prototype.memberIndex = function (member) {
    var index = this.members.indexOf(member);
    return index >= 0 ? index + 1 : 0;
  };

  BundlePage.prototype.firstInvalidMember = function () {
    return this.members.find(function (member) {
      return member.isInvalid();
    });
  };

  BundlePage.prototype.activeMember = function () {
    return this.members.find(function (member) {
      return member.isExpanded();
    });
  };

  BundlePage.prototype.allComplete = function () {
    return this.members.every(function (member) {
      return member.isComplete();
    });
  };

  BundlePage.prototype.bindMemberPreviews = function () {
    var self = this;
    var serializeMember = this.pricing.serializeMemberAsProduct.bind(this.pricing);

    this.members.forEach(function (member) {
      var panel = self.gallery.panelForProductId(member.productId);
      if (!panel) return;

      new BundleMemberPreview(member.row, panel, self.gallery, serializeMember, function () {
        return self.mode === 'configuring';
      });
    });
  };

  BundlePage.prototype.bindMemberLogoFeatures = function () {
    this.members.forEach(function (member) {
      var row = member.row;

      if (row.dataset.virtualLogos !== 'true') return;

      if (typeof ProductLogosController === 'function') {
        var controller = new ProductLogosController(row);
        $(row).data('product-logos', controller);
        $(row).find('.line-items-reflective-view').data('product-logos', controller);
      }

      if (typeof bindColorRestrictions === 'function') {
        bindColorRestrictions(row);
      }

      if (typeof bindUnselectLogo === 'function') {
        bindUnselectLogo(row);
      }
    });
  };

  BundlePage.prototype.bindMemberImagePreviews = function () {
    var self = this;

    if (typeof bindProductImagePreview !== 'function' || typeof ProductPreviewScope !== 'function') {
      return;
    }

    this.members.forEach(function (member) {
      var panel = self.gallery.panelForProductId(member.productId);
      if (!panel) return;

      bindProductImagePreview(
        ProductPreviewScope.forBundleMember(member.row, panel, {
          galleryInteractionEnabled: function () {
            return self.mode === 'configuring';
          },
          galleryVisible: function () {
            return !panel.classList.contains('d-none') && !panel.hidden;
          },
        })
      );
    });
  };

  BundlePage.prototype.bindFormEvents = function () {
    var self = this;

    $(this.form)
      .find('.line-items-reflective-view, .total-info')
      .on('change', 'input, select, textarea', function () {
        var row = $(this).closest('.bundle-member-row')[0];
        if (!row) return;

        var member = self.members.find(function (m) {
          return m.row === row;
        });
        if (member) self.pricing.scheduleUpdate(member);
      });
  };

  BundlePage.prototype.initializeFromServer = function () {
    var submitted = this.page.dataset.submitted === 'true';
    var editing = this.page.dataset.editing === 'true';
    var invalidMember = this.firstInvalidMember();

    if (submitted || (editing && invalidMember)) {
      this.members.forEach(function (member) {
        if (member === invalidMember) return;
        if (!member.isInvalid()) {
          memberValidation.writeSummary(member.row);
          member.markComplete();
        }
      });
      this.expandMember(invalidMember, false);
      return;
    }

    if (editing) {
      this.members.forEach(function (member) {
        memberValidation.writeSummary(member.row);
        member.markComplete();
      });
      this.enterSummaryMode();
      return;
    }

    this.members.forEach(function (member, i) {
      if (i === 0) {
        this.expandMember(member, false);
      } else {
        member.showIncomplete();
      }
    }, this);
  };

  BundlePage.prototype.expandMember = function (member, wasComplete) {
    var current = this.activeMember();
    if (current && current !== member) {
      current.collapse();
    }

    this.exitSummaryMode(false);
    member.expand(wasComplete);
  };

  BundlePage.prototype.advanceAfterSave = function (member, isSaveChanges) {
    if (isSaveChanges) {
      this.enterSummaryModeIfComplete();
      return;
    }

    var nextIncomplete = this.members.find(function (candidate) {
      return !candidate.isComplete();
    });

    if (nextIncomplete) {
      this.expandMember(nextIncomplete, false);
    } else {
      this.enterSummaryMode();
    }
  };

  BundlePage.prototype.enterSummaryModeIfComplete = function () {
    if (this.allComplete()) {
      this.enterSummaryMode();
    } else {
      this.updateProgress();
    }
  };

  BundlePage.prototype.enterSummaryMode = function () {
    this.mode = 'summary';
    this.page.classList.add('bundle-page--summary');
    this.page.dataset.mode = 'summary';

    this.members.forEach(function (member) {
      dom.hideEl(member.expandedArea());
      dom.hideEl(member.incompleteButton());
      dom.showFlex(member.completeButton());
    });

    this.gallery.enterSummaryMode();

    if (this.subtitleText) {
      this.subtitleText.textContent = 'Summary';
    }

    this.setCtaEnabled(true);

    window.scrollTo(0, 0);
  };

  BundlePage.prototype.exitSummaryMode = function (sync) {
    this.mode = 'configuring';
    this.page.classList.remove('bundle-page--summary');
    this.page.dataset.mode = 'configuring';
    this.gallery.exitSummaryMode();
    this.setCtaEnabled(false);
    if (sync !== false) this.updateProgress();
  };

  BundlePage.prototype.updateProgress = function () {
    var activeMember = this.activeMember();
    var progressIndex = activeMember ? this.memberIndex(activeMember) : 0;

    if (this.progressCurrent && progressIndex) {
      this.progressCurrent.textContent = String(progressIndex);
    }

    if (this.subtitleText && this.mode === 'configuring' && progressIndex) {
      this.subtitleText.innerHTML =
        'Product <span class="bundle-progress-current">' + progressIndex + '</span> of ' + this.memberCount;
      this.progressCurrent = this.page.querySelector('.bundle-progress-current');
    }
  };

  BundlePage.prototype.setCtaEnabled = function (enabled) {
    this.ctaButtons.forEach(function (button) {
      button.disabled = !enabled;
      button.classList.toggle('opacity-50', !enabled);
    });
  };

  function initBundles() {
    document.querySelectorAll('.bundle-page').forEach(function (page) {
      new BundlePage(page);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBundles);
  } else {
    initBundles();
  }
})();
