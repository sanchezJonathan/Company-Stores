function emptyCart() {
  let form = $("<form>", { method: "post", action: "/cart/empty" });
  form.append($("<input>", { type: "hidden", name: "_method", value: "put" }));
  $("body").append(form);
  form.trigger("submit");
  form.remove();
}

function emptyWishlist() {
  let form = $("<form>", { method: "post", action: "/wishlist/empty" });
  form.append($("<input>", { type: "hidden", name: "_method", value: "put" }));
  $("body").append(form);
  form.trigger("submit");
  form.remove();
}

$(function () {
  var cartContainer = $("div.shopping-cart");
  if (cartContainer.is("*")) {
    $("form.edit_website_order a.empty-cart").on("click", function (event) {
      event.preventDefault();
      emptyCart();
    });

    $("form.edit_website_wishlist a.empty-cart").on("click", function (event) {
      event.preventDefault();
      emptyWishlist();
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
