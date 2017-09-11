# Jquery planning doc
  ## user experience
  user can call .lightUp() on any div with children
  ## api
  ```javascript

  $("#some-element").lightUp(
  //Default values for light it up
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
  );
  ```