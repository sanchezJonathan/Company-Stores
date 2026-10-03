$(function(){
  var select = $('#personalization_group_select');
  select.on('change', function() {
    if(select.val()) {
      var url = select.data('url').replace('%id%', select.val());
      $.getJSON(url, function(data){
        $.each(data, function(index, input){
          var selector = '.product-personalization .pp-input[data-input-id="' + input.form_input_id + '"]';
          $(selector).val(input.value).change();
        });
      });
    }
  });
});
