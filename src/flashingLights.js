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
      className: '_r34l',
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
          // add class of main elements
          $(this).addClass(settings.className);
          // pick a random color for the box from the color array
          $(this).css('background-color', settings.colors[settings.randomNumberGenerator(0, settings.colors.length)]);
        });
        me.children().wrapAll( "<div/>");
        var extraTiles = 0;
        var spaceTiles = settings.amountPerScreen - contentAmt
        if(spaceTiles === 0 || Math.abs(spaceTiles) == 1){
          extraTiles = 1;
        }
        else if(spaceTiles > 1){
          extraTiles = spaceTiles
        }
        extraTiles = Math.ceil(extraTiles / settings.amountPerScreen);
        var movementBox = me.children();
        var uniqueTiles = movementBox.children();
        for(var i = 0; i < extraTiles; i++) {
          uniqueTiles.clone(true).prependTo(movementBox).removeClass(settings.className);
          uniqueTiles.clone(true).appendTo(movementBox).removeClass(settings.className);
        }
        return {tiles: contentAmt, extraTiles: extraTiles * settings.amountPerScreen};
      }

      //populate the slot with the appropriate tiles
      // tiles -> amount of tiles to traverse
      function populateSlot(me, tiles) {
        var movementBox = me.children();
        var uniqueTiles = movementBox.children("." + settings.className);
        var uniqueTilesAmt = uniqueTiles.length;
        for(var i = 0; i < tiles / uniqueTilesAmt; i++) {
          uniqueTiles.clone(true).appendTo(movementBox).addClass(settings.deleteClassName);
        }
      }

      // spin the slot the apropriate number of tiles
      function spinX(input) {
        var spinInput = $.extend( {
          //me, 
          //tiles,
          //extraTiles,
          //pos,
          //callback
          animation: 'linear'
        }, input);
        //total pixel distance nessisary to travel
        var totalDist = spinInput.me.children().children("." + settings.className + ":first").height() * (spinInput.tiles + spinInput.pos + spinInput.extraTiles);
        spinInput.me.children().animate({
          'margin-top': "-" + totalDist + "px",
        }, 500, spinInput.animation, function() {
          // return to set postion
          returnTo(spinInput.me, spinInput.pos, spinInput.extraTiles);
          // remove extra tiles to avoid cluttering up dom
          depopulateSlot(spinInput.me);
          // callback
          if(spinInput.callback){
            spinInput.callback();
          }
        });
      }

      //de-populate the slot
      function depopulateSlot(me) {
        me.children().children("." + settings.deleteClassName).remove(); 
      }

      // return to correct position
      function returnTo(me, pos, extra){
        var totalDist = me.children().children("." + settings.className + ":first").height() * (pos + extra);
        me.children().css("margin-top", "-" + totalDist + "px");
      }

      // run a spin on a slot
      function slotSpin(me, goTo, tiles, extraTiles, callback) {
        var goTo = goTo || settings.randomNumberGenerator(0, tiles);
        // find how many complete rotations the slot should make
        var totalSpins = settings.randomNumberGenerator(3, 10);
        // how many total tiles are traversed in this situation
        var tilesTraversed = (totalSpins * tiles);
        // fills the area with filler tiles to make the slot seem infinite
        populateSlot(me, tilesTraversed);
        // spins the slot x amount of times
        spinX({
          me: me,
          tiles: tilesTraversed,
          extraTiles: extraTiles,
          pos: goTo,
          callback: callback
        });
        return goTo;
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
            return slotSpin(self, spinDefaults.to, childInfo.tiles, childInfo.extraTiles, function() {
              if(spinDefaults.done){
                spinDefaults.done();
              }
            });
          }
        }
      }
      // if there are more than 1 slot
      else {
        var childrenInfo = [];
        self.each(function() {
          childrenInfo.push( setUpSlot($(this)) );
        });
        return {
          spin: function( input ) {
            var spinDefaults = $.extend( {
              // select the tile to finish on
              // to: undefined
              // callback when spin is finished
              // done: undefined
            }, input);
            var outputArr = [];
            var i = 0;
            self.each(function() {
              var goTo = spinDefaults.to || settings.randomNumberGenerator(0, childrenInfo[i].tiles);
              outputArr.push(slotSpin($(this), goTo, childrenInfo[i].tiles, childrenInfo[i].extraTiles));
              i++;
            });
            var wait = setInterval(function() {
              if( !self.children().is(":animated") ) {
                clearInterval(wait);
                if(spinDefaults.done){
                  spinDefaults.done();
                }
              }
            }, 100);
            return outputArr;
          }
        }
      }
    }
  };
})( jQuery );