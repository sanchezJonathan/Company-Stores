window.ProductReviewsController = (function() {
  function ProductReviewsController() {
    this.container = $('.product-reviews-container');
    this.header = this.container.find('.product-reviews > .product-reviews-header');
    this.reviews = this.container.find('.product-reviews-list');
    this.pagination = this.container.find('.reviews-paginator');
    this.form = this.container.find('form');

    this.initialize();
  }

  ProductReviewsController.prototype.initialize = function() {
    this.bindWriteReview();
    this.bindCancelReview();
    this.bindPreviewReview();
    this.bindEditPreview();
    this.bindSubmitReview();
    this.bindRating(0);
  };

  ProductReviewsController.prototype.bindWriteReview = function() {
    var self = this;

    this.container.on('click', '.add-review-btn', function (event) {
      event.preventDefault();

      if (self.preview) { self.preview.remove() }

      self._toggleListing(true);
      self._showForm();
      self._resetForm();
    });
  };

  ProductReviewsController.prototype.bindPreviewReview = function() {
    var self = this;

    this.container.on('click', '.preview-review-btn', function (event) {
      event.preventDefault();

      var previewUrl = self.form.data('preview-url');
      var data = self.form.serialize();

      $.ajax({
        url: previewUrl,
        method: 'POST',
        data: data,
        dataType: 'script'
      })
    });
  };

  ProductReviewsController.prototype.bindCancelReview = function() {
    var self = this;

    this.container.on('click', '.cancel-review', function(event) {
      event.preventDefault();

      if (self.preview) { self.preview.remove() }

      self._toggleListing(false);
      self._hideForm();
    });
  };

  ProductReviewsController.prototype.bindEditPreview = function() {
    var self = this;

    this.container.on('click', '.edit-review', function(event) {
      event.preventDefault();

      if (self.preview) { self.preview.remove() }
      self._showForm();
    });
  };

  ProductReviewsController.prototype.bindSubmitReview = function() {
    var self = this;

    this.container.on('click', '.submit-review-btn', function(event) {
      event.preventDefault();
      self.form.submit();
    });
  };

  ProductReviewsController.prototype.bindRating = function(score) {
    this.form.find('.rating-stars').raty({
      score: score,
      half: true,
      scoreName: 'review[stars]'
    });
  };

  ProductReviewsController.prototype.showPreview = function(content) {
    this._hideForm();
    this._clearErrors();

    this.preview = $(content);
    this._bindReadonlyRating(this.preview);
    this.reviews.append(this.preview);
  };

  ProductReviewsController.prototype.replaceForm = function(content, score) {
    var $newForm = $(content);
    this.form.replaceWith($newForm);
    this.form = $newForm;
    this.bindRating(score);
  };

  ProductReviewsController.prototype.appendReviews = function(content) {
    var $reviews = $(content);
    this._bindReadonlyRating($reviews);
    this.reviews.append($reviews);
  };

  ProductReviewsController.prototype.replaceReviews = function(content) {
    var $reviews = $(content);
    this._bindReadonlyRating($reviews);
    this.reviews.html($reviews);
  };

  ProductReviewsController.prototype.updatePagination = function(content) {
    var $pagination = $(content);
    this.pagination.replaceWith(content);
    this.pagination = $pagination;
  };

  ProductReviewsController.prototype.reviewCreated = function(message) {
    this.preview.addClass('submit').text(message);
    this.container.find('.empty-set').remove();
    this._hideForm();
    this._toggleListing(false);
  };

  ProductReviewsController.prototype._toggleListing = function(inactivate) {
    this.reviews.toggleClass('inactive', inactivate);
    this.pagination.toggleClass('inactive', inactivate);
    this.container.find('.add-review-btn').toggle(!inactivate);
  };

  ProductReviewsController.prototype._showForm = function() {
    this.form.parent().show(400);
  };

  ProductReviewsController.prototype._hideForm = function() {
    this.form.parent().hide(400);
  };

  ProductReviewsController.prototype._clearErrors = function() {
    this.form.find('.error').remove();
  };

  ProductReviewsController.prototype._resetForm = function() {
    this.form.find('.form-item input, .form-item textarea').val('');
    this.form.find('.rating-stars').raty('set', { score: 0.0 });
  };

  ProductReviewsController.prototype._bindReadonlyRating = function($container) {
    createReadonlyRating($container.find('.show-star'));
  };

  return ProductReviewsController;
})();
