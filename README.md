# flashingLights.js
##About
flashingLights.js is a jQuery plugin that creates interactive gambling machines. Slot machines, roulette wheels, and more are fully customizable; graphical elements, like the symbols on a slot machine's revolving reel, can be modified in the body of your webpage. By default, outcomes are determined by JavaScript's native random number generator, but this can be altered in lightUp()'s API. 
##Progress
A functional demo of flashingLights.js is available, but this project is a work in progress. Feel free to pull or fork.
##How to Use
1. Set up your HTML in the following format, making certain that the parent element is a div.
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
2. Initialize a lightUp object as shown below.
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
3. Insert the following spin function.
```javascript
  // spins to a random position between the ones in the html(one, two, three), 
  // runs the callback when finished spinning
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