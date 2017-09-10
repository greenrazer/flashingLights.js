# Slot Machine Planning Doc
  ## user experience
  each element the function is called on will create one slot
  for example:
  ```
   single slot 1 | single slot 2 | single slot 3
  ---------------+---------------+-------------
       slot1     |     slot1     |    slot1
       slot2     |     slot2     |    slot2
  ```
  - each slot has a spin function
  ## api
  example: 
  ```javascript
  // for one
  var slot1 = $("#element").lightUp({type:'slot'});
  // for many
  var slots = $(".elements").lightUp({type:'slot'});
  // spins to the zero position, returns the input parameter
  slot1.spin(0);
  // e.g. returns 0
  //spins all slots to a random position, returns an array of random numbers between zero and the size of the slot
  slots.spin();
  // e.g. returns [3, 4, 2, ..., 3, 1]
  ```
