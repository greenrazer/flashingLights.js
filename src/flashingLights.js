(function( $ ){

  $.fn.lightUp = function( options ) {  

    var settings = $.extend( {
      'type'         : 'slot'
    }, options);

    return this.each(function() {

      console.log(settings.type);

    });

  };
})( jQuery );