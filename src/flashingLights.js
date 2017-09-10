(function( $ ){

  $(document).ready(function() {
    $("html").append("<style></style>")
  });

  function wholeRandBetween(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  $.fn.lightUp = function( options ) {

    //if no arguments are given default to slot
    var settings = $.extend( {
      'type': 'slot',
      'colors': ['blue', 'green', 'red', 'yellow'],
      'amountPerScreen': 1
    }, options);

    // only allow divs
    var self = this.filter("div");

    if(settings.type === 'slot'){

      //function for setting up the basic styling properties of the slot
      function setUpSlot(me){
        var height = me.height();
        //amount of children in slot
        var contentAmt = me.children().length
        // set the overflow of the parent div to hidden
        me.css('overflow', 'hidden');
        // fix the height of the div a t the height it currently is
        me.height(height);
        // go through each of the immediate children
        me.children().each(function(){
          //set each child to the height of the parent box
          $(this).height(height);
          // pick a random color for the box from the color array
          $(this).css('background-color', settings.colors[wholeRandBetween(0, contentAmt+1)]);
        });
      }
      // if there are 1 or 0 slots
      if(self.length === 1){
        setUpSlot(self);
      }
      // if there are more than 1 slot
      else {
        self.each(function() {
          setUpSlot($(this));
        });
      }
    }
  };
})( jQuery );