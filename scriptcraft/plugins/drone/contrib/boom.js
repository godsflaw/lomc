'use strict';
/*global require*/
var Drone = require('drone'),
    blocks = require('blocks'),
    inventory = require('inventory'),
    items = require('items'),
    utils = require('utils');
/************************************************************************
### Drone.boom() method

Constructs a mayan boom.

#### Parameters
 
 * side - How many blocks wide and long the boom will be (default: 20)

#### Example

At the in-game prompt you can create a boom by looking at a block and typing:

```javascript
/js boom()
```

Alternatively you can create a new Drone object from a Player or Location object and call the boom() method.

```javascript
var d = new Drone(player);
d.boom();
```
![boom example](img/boomex1.png)

***/
function boom( side ) {
  if ( !side ) {
    side = 20;
  }
  this.chkpt('boom');

  while ( side > 4 ) {
    var middle = Math.round( (side-2) / 2 );
    this
      .chkpt('boom-corner')
      .box( blocks.tnt, side, 1, side )
      .right( middle )
      .box( blocks.tnt )
      .right()
      .box( blocks.tnt )
      .move('boom-corner')
      .up()
      .fwd()
      .right();
    side = side - 2;
  }

  this.move('boom');

  inventory(self)
      .add( items.bow(1) )
      .add( items.arrow(20) );
}
Drone.extend( boom );
