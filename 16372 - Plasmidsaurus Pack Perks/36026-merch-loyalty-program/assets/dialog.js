// Render dialog which is basically a container with overlay
//
// Example:
//   var dialog = new Dialog()
//   dialog.render(html)
//   dialog.show()
var Dialog = function() {
  'use strict';

  var id = 'dialog-' + (new Date().getTime());
  var $dialog = $('<div />', { id: id, class: 'dialog' });
  var $overlay = $('<div />', { class: 'dialog-overlay' });

  this.render = function(html) {
    $.when(html)
      .then(function(html) {
        $dialog.html(html);
        recenter();
      });
  };

  this.show = function() {
    if (isShown()) return;

    $overlay.appendTo('body');
    $dialog.appendTo('body');
  };

  this.hide = function() {
    $overlay.remove();
    $dialog.detach();
  };

  var recenter = function() {
    $dialog.center();
  };

  var isShown = function() {
    return $('#' + id).length;
  };

  // Events
  $overlay.on('click', this.hide);
  $dialog.on('dialog:recenter', recenter);
};
