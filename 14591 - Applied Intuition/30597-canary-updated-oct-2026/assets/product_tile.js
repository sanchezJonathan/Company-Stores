$(function () {
  var canHover = window.matchMedia('(hover: hover)').matches;

  function photos($tile) {
    var $color = $tile.find('.product-tile-color.selected');
    return String(($color.length ? $color : $tile).data('photos')).split('|');
  }

  // Shows photo i of the given list (defaults to the selected color) and redraws the dashes
  function show($tile, i, list) {
    list = list || photos($tile);
    i = (i + list.length) % list.length;
    $tile.data('index', i).find('.product-tile-photo img').attr('src', list[i]);
    $tile.find('.product-tile-dashes').html(list.length > 1 ? list.map(function (url, n) {
      return '<span' + (n === i ? ' class="current"' : '') + '></span>';
    }).join('') : '');
  }

  function step($tile, by) {
    show($tile, ($tile.data('index') || 0) + by);
  }

  $('.product-tile').each(function () { show($(this), 0); });

  if (canHover) {
    $(document)
      .on('mouseenter', '.product-tile', function () { show($(this), 1); })
      .on('mouseleave', '.product-tile', function () { show($(this), 0); })
      .on('mouseenter', '.product-tile-color', function () {
        var list = String($(this).data('photos')).split('|');
        show($(this).closest('.product-tile'), 1, list);
      })
      .on('mouseleave', '.product-tile-colors', function () {
        var $tile = $(this).closest('.product-tile');
        show($tile, $tile.data('index'));
      });
  }

  $(document)
    .on('click', '.product-tile-arrow', function () {
      step($(this).closest('.product-tile'), $(this).hasClass('next') ? 1 : -1);
    })
    .on('click', '.product-tile-color', function () {
      var $tile = $(this).closest('.product-tile');
      $tile.find('.product-tile-color').removeClass('selected').attr('aria-pressed', 'false');
      $(this).addClass('selected').attr('aria-pressed', 'true');
      $tile.find('a').attr('href', $tile.data('url') + '?color=' + $(this).data('id'));
      show($tile, canHover ? 1 : 0);
    });

  // Phones: sideways swipe changes photo; touch-action: pan-y leaves vertical scrolling to the browser
  var start = null;
  $(document)
    .on('touchstart', '.product-tile-photo', function (e) {
      var t = e.originalEvent.touches[0];
      start = { x: t.clientX, y: t.clientY };
    })
    .on('touchend', '.product-tile-photo', function (e) {
      if (!start) return;
      var t = e.originalEvent.changedTouches[0];
      var dx = t.clientX - start.x, dy = t.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault(); // a swipe is not a tap, so don't open the product
        step($(this).closest('.product-tile'), dx < 0 ? 1 : -1);
      }
    });
});
