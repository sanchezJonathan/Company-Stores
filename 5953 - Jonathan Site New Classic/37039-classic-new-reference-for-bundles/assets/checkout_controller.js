window.CheckoutController = (function () {

  function CheckoutController(state) {
    this.state = state;
    this.initialize();
  }

  CheckoutController.prototype.initialize = function () {
    this.prepareStateSelect();
    this.activateStateDependencies();
    this.bindSubmitOnlyOneClick();
    this.bindDatepicker();
  };

  CheckoutController.prototype.prepareStateSelect = function () {
    //new CountrySelectController('#website_order_shipping_address_attributes_country','#website_order_shipping_address_attributes_state');
    //new CountrySelectController('#website_order_billing_address_attributes_country','#website_order_billing_address_attributes_state');
  };

  CheckoutController.prototype.activateStateDependencies = function () {
    var self = this;

    switch (self.state) {
      case 'address':
        $('.content-item.shipping .method label').addClass('unavailable').find('input[type="radio"]').attr('disabled', true);
        self.bindExistingAddressSelect('shipping');
        self.bindTaxExemptionReason();
        break;
      case 'delivery':
        $('.content-item.shipping .contact input').attr('disabled', true);
        $('.content-item.shipping .address input').attr('disabled', true);
        $('.content-item.shipping .address select').attr('disabled', true).trigger("liszt:updated");
        self.bindSubmitDeliveryForm();
        break;
      case 'payment':
        self.bindPaymentMethodsSwitcher();
        self.preparePaymentMethods();
        self.bindDuplicateShippingAddressAction();
        self.bindSmallCustomSelect();
        self.bindPromotionDeletion();
        self.bindExistingAddressSelect('payment');
        break;
    }
  };

  CheckoutController.prototype.bindDatepicker = function () {
    $('.datepicker').datepicker();
  };

  CheckoutController.prototype.bindPaymentMethodsSwitcher = function () {
    $('.content-item.payment .form-radio label.available input').bind('change click', function (event) {
      $('.method .payment-method').hide();
      var selector = '.payment-method-for-' + $(this).attr('id');

      $('.payment-method').hide();
      if ($(this).is(':checked') == true) {
        $(selector).show();
      }
    });
  };

  CheckoutController.prototype.preparePaymentMethods = function () {
    $('.content-item.payment .form-radio label.unavailable input').attr('disabled', 'disabled');

    var checked = $('.content-item.payment .form-radio label.available input:checked');
    if (!checked.is('*'))
      $('.content-item.payment .form-radio label.available input:first').attr('checked', true).trigger('change');
    else
      checked.trigger('change');
  };

  CheckoutController.prototype.bindDuplicateShippingAddressAction = function () {
    var self = this;

    $('.content-item.payment input#same-as-shipping-address').live('change', function (event) {
      var container = $('.content-item.payment .address');
      var checkbox = $(this);

      if (checkbox.is(':checked')) {
        container.find('input[type="text"]').attr('disabled', 'disabled').removeClass('with-hint');
        self._updateAddress(container, checkbox.data('shipping'));
      } else {
        container.find('input[type="text"]').attr('disabled', false);
      }
    });
  };

  CheckoutController.prototype.bindSubmitDeliveryForm = function () {
    var container = $('.content-item.shipping .method');
    container.find('input[type="submit"]').off('click').on('click', function (event) {
      if (!container.find('input[type="radio"]:checked').is('*')) {
        event.preventDefault();
      } else {
        $(this).off('click').on('click', function (event) {
          event.preventDefault();
        })
      }
    });
  };

  CheckoutController.prototype.bindPromotionDeletion = function () {
    $('.promotions .fields').live('nested:fieldRemoved:coupons', function () {
      var form = $('.promotions .fields').parents('form');
      var actsLikeApplyCode = $("<input type='hidden' name='apply_coupon_code' value='1'/>");
      form.append(actsLikeApplyCode);
      form.submit();
      actsLikeApplyCode.remove();
    });
  };

  CheckoutController.prototype.bindSmallCustomSelect = function () {
    $('.content-item.payment .payment-method select').each(function () {
      $(this).wrap("<div class='select-wrapper'></div>").parent().css({
        'position': 'relative',
        'float': 'left',
        'margin-left': '9px',
        'width': '95px',
        'margin-top': '8px',
      });

      var title = $(this).attr('title');
      if ($('option:selected', this).val() != '') title = $('option:selected', this).text();
      $(this)
        .css({'z-index': 10, 'opacity': 0, '-khtml-appearance': 'none'})
        .after('<span class="small-select">' + title + '</span>')
        .change(function () {
          val = $('option:selected', this).text();
          $(this).next().text(val);
        })
    });
    $('.content-item.payment .payment-method .select-wrapper:first').css({'margin-left': 0}).parent('p.field').css({'margin-bottom': '18px'});
  };

  CheckoutController.prototype.bindExistingAddressSelect = function (addressType) {
    var self = this;
    var container = $('.content-item.' + addressType + ' .address');
    var select = container.find('.form-select select.address-dropdown');

    select.on('change', function (event) {
      var addressId = $(this).val();

      if (addressId != '-1') {
        $.ajax({
          url: '/account/addresses/' + addressId
        }).done(function (data, textStatus, jqXHR) {
          self._updateAddress(container, data.address);
        }).fail(function (jqXHR, textStatus, errorThrown) {
          console.error("Can't get address information.");
        });
      }
    });
  };

  CheckoutController.prototype.bindSubmitOnlyOneClick = function () {
    $('form.edit_website_order input[type="submit"]').on('click.submitOnce', function () {
      var $btn = $(this);

      $btn.closest('form').one('submit.submitOnce', function (submitEvent) {
        if (submitEvent.isDefaultPrevented()) {
          return;
        }

        $btn.off('click.submitOnce').on('click.submitOnce', function (event) {
          event.preventDefault();
        });
      });
    });
  };

  CheckoutController.prototype.bindTaxExemptionReason = function () {
    var $checkbox = $('#checkout-tax-exempt');

    if (!$checkbox.length) {
      return;
    }

    var $reasonSelect = $('#checkout-tax-exempt-reason-select');
    var $reasonBlock = $('#checkout-tax-exempt-reason');
    var $clientError = $('#checkout-tax-exempt-reason-client-error');
    var $form = $checkbox.closest('form');

    function clearTaxExemptClientError() {
      $reasonSelect.removeClass('is-invalid');
      $clientError.text('').addClass('d-none');
    }

    function showTaxExemptClientError(message) {
      $reasonSelect.addClass('is-invalid');
      $clientError.text(message).removeClass('d-none');
    }

    $checkbox.on('change', function () {
      $reasonSelect.prop('disabled', !this.checked);

      if (!this.checked) {
        $reasonSelect.val('');
      }

      clearTaxExemptClientError();
    });

    $reasonSelect.on('change', clearTaxExemptClientError);

    function blockTaxExemptSubmit(event) {
      if (!$checkbox.is(':checked') || $reasonSelect.val()) {
        return false;
      }

      event.preventDefault();

      $reasonBlock.addClass('show');
      $reasonSelect.prop('disabled', false);
      showTaxExemptClientError('Please select a reason for your tax exemption.');
      $reasonSelect.trigger('focus');
      return true;
    }

    $form.on('submit.taxExemption', function (event) {
      blockTaxExemptSubmit(event);
    });
  };

  CheckoutController.prototype._updateAddress = function (selector, data) {
    var container = $(selector);

    const setField = (selector, value) => {
      const field = container.find(selector);
      const maxlength = field.prop('maxlength');

      if (value && maxlength && Number.isInteger(maxlength) && maxlength > 0) {
        field.val(value.substring(0, maxlength))
      } else {
        field.val(value)
      }

      return field
    }

    setField('input.nickname', data.nickname);
    setField('input.company', data.company);
    setField('input.first-address', data.first_address);
    setField('input.second-address', data.second_address);
    setField('input.city', data.city);
    setField('select.country', data.country).trigger('change');
    setField('select.state', data.state).trigger('change');
    setField('input.zip', data.zip);
    setField('input.first-name', data.first_name);
    setField('input.last-name', data.last_name);
    setField('input.email', data.email);
    setField('input.phone', data.phone);

    container.find('select').trigger("liszt:updated");
  };

  return CheckoutController;
})();
