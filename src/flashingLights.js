;(function( $ ){

  $.fn.lightUp = function( options ) {

    // returns a whole number between a given min and max value
    // max > min
    function wholeRandBetween(min, max){
      return Math.floor(Math.random() * (max - min)) + min;
    }

    //default arguments
    var settings = $.extend( {
      type: 'slot',
      colors: ['blue', 'green', 'red', 'yellow'],
      amountPerScreen: 1,
      deleteClassName: '_dltl8er',
      randomNumberGenerator: wholeRandBetween 
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
          //set each child to the height divided by  of the parent box
          $(this).height(height / settings.amountPerScreen);
          // pick a random color for the box from the color array
          $(this).css('background-color', settings.colors[settings.randomNumberGenerator(0, settings.colors.length)]);
        });
        me.children().wrapAll( "<div/>");
        return {tiles: contentAmt};
      }

      //populate the slot with the appropriate tiles
      // tiles -> amount of tiles to traverse
      function populateSlot(me, tiles) {
        var movementBox = me.children();
        var uniqueTiles = movementBox.children()
        var uniqueTilesAmt = uniqueTiles.length;
        for(var i = 0; i < tiles / uniqueTilesAmt; i++) {
          uniqueTiles.clone(true).appendTo(movementBox).addClass(settings.deleteClassName);
        }
      }

      // spin the slot the apropriate number of tiles
      // tiles -> amount of tiles to traverse
      function spinX(me, tiles, pos, callback) {
        //total pixel distance nessisary to travel
        var totalDist = me.children().children(":first-of-type").height() * (tiles + pos);
        me.children().animate({
          'margin-top': "-" + totalDist + "px",
        }, 500, 'linear', function() {
          returnTo(me, pos);
          depopulateSlot(me);
          callback();
        });
      }

      //de-populate the slot
      function depopulateSlot(me) {
        me.children().children("." + settings.deleteClassName).remove(); 
      }

      // return to correct position
      function returnTo(me, pos){
        var totalDist = me.children().children(":first-of-type").height() * pos;
        me.children().css("margin-top", "-" + totalDist + "px");
      }

      // if there are 1 or 0 slots
      if(self.length === 1){
        var childInfo = setUpSlot(self);
        return {
          spin: function( input ) {
            var spinDefaults = $.extend( {
              // select the tile to finish on
              to: settings.randomNumberGenerator(0, childInfo.tiles),
              // callback when spin is finished
              done: undefined
            }, input);
            // find how many complete rotations the slot should make
            var totalSpins = settings.randomNumberGenerator(3, 10);
            // how many total tiles are traversed in this situation
            var tilesTraversed = (totalSpins * childInfo.tiles);
            populateSlot(self, tilesTraversed);
            spinX(self, tilesTraversed, spinDefaults.to, function() {
              if(spinDefaults.done){
                spinDefaults.done();
              }
            });
            return spinDefaults.to;
          }
        }
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