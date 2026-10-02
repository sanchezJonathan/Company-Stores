(function ($) {
  $.fn.extend({
    center: function () {
      var top = function(el) {
        var middle = ($(window).height() - $(el).outerHeight()) / 2;
        return $(window).scrollTop() + (middle > 0 ? middle : 0);
      };

      var left = function(el) {
        var width = ($(window).width() - $(el).outerWidth()) / 2;
        return (width > 0 ? width : 0);
      };

      return this.each(function () {
        $(this).css({
          position: 'absolute',
          margin: 0,
          top: top(this) + 'px',
          left: left(this) + 'px'
        });
      });
    }
  });
})(jQuery);
