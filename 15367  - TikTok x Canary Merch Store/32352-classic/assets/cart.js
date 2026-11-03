$(function () {
  var cartContainer = $("div.shopping-cart");

  if (cartContainer.is("*")) {
    $("a.empty-cart").on("click", function (event) {
      $(".cart-quantity-input ").val(0);
      $("#edit_website_order").submit();
      event.preventDefault();
    });
  }

  $(".remove-cart-item").each(function () {
    var pricingTitles = $(this)
      .closest("tr.cart-item")
      .find("td.pricing-column")
      .find(".cart-inline-title").length;
    var descTitles = $(this)
      .parent("div.item-description")
      .find(".cart-inline-title-short").length;
    var totalDescTitles = descTitles - pricingTitles;

    if (totalDescTitles > 0) {
      $(this).addClass("margin-left");
    }
  });
});
