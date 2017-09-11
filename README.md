# flashingLights.js
## About
flashingLights.js is a jquery plugin that creates interactive gambling machines such as slot machines, roulette, and many more
## disclaimer
this is currently not entirely done, if you want to mess around with it feel free to pull or fork
## how to use
1. set up your html in a format resembling this make sure the parent element is a div
```html
  <div id="slot1">
    <div>
      One
    </div>
    <div>
      Two
    </div>
    <div>
      Three
    </div>
  </div>
```
2. initalize a lightUp object like shown
```javascript
  // returns an object with methods to change slots
  var slot = $("#slot1").lightUp({align:'top'});

  // Default values for lightUp
  {
    // currently only one type, slot
    type: 'slot',
    // colors to choose from for colorful backgrounds
    colors: ['blue', 'green', 'red', 'yellow'],
    // amount of items that will show up on a slot div at one time
    amountPerScreen: 1,
    // to make sure internal class names dont interfere with external ones,
    // you can change them
    deleteClassName: '_dltl8er',
    className: '_r34l',
    // lightUp uses javascripts native random number generator, however, 
    // if you want to use your own put it in the format randnumber(min, max)
    randomNumberGenerator: randnumber,
    // align defailts to center but options include ['top', 'bottom', 'center']
    align: 'center'
  }
```
3. 
```javascript
  // spins to a random position between the ones in the html(one, two, three), runs the callback when finished spinning
  slot1.spin({
    done: function(value){alert("current value for this slot is: " + val);}
  });
  // (e.g. might alert "current value for this slot is: 0") 
  // FYI the first user put in div is the 0th position

  //Default values for spin
  {
    // select the tile to finish on defaults to random value
    to:randomVal,
    // callback when spin is finished
    // format `function(value)`
    done: undefined
  }
```