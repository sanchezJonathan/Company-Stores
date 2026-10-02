function bindGiftCertificateForm() {
  'use strict';

  var $quantitySelect = $("#gift_certificates_quantity");
  $quantitySelect.on('change', function () {
    var currentQuantity = parseInt($quantitySelect.val());

    var $template = $('#new-certificate-details');
    var replaceRegexp = new RegExp($template.data('index'), 'g');

    var $variants = $('.gift-certificate-variants');
    $variants.find(".gift-certificate-details:gt(" + (currentQuantity - 1) + ")").remove();

    for(var index = 0; index < currentQuantity; ++index) {
      if (!$variants.find(".gift-certificate-details:eq(" + index + ")").length) {
        $($template.html().replace(replaceRegexp, index + 1)).appendTo($variants);
      }
    }
  });

  var $amountSelect = $("#gift_certificates_amount");
  if($amountSelect.find('option').length == 1 && $amountSelect.val() == 'custom') {
    $amountSelect.closest('.select-area').hide();
  }
  $amountSelect.on('change', function () {
    $('#gift_certificate_custom_amount').toggle($amountSelect.val() == 'custom');
  });
  $amountSelect.change();
}
