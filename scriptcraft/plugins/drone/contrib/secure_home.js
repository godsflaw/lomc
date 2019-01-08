'use strict';

var Drone = require('drone'),
    blocks = require('blocks');

/************************************************************************
### Drone.secure_home() method

Creates a simple but cosy dwelling.

#### Example

At the in-game prompt you can create a secure_home by looking at a block and typing:

```javascript
/js secure_home()
```

Alternatively you can create a new Drone object from a Player or Location object and call the secure_home() method.

```javascript
var d = new Drone(player);
d.secure_home();
```
![secure_home example](img/secure_homeex1.png)

***/
function secure_home( ) {
  this
    .chkpt('secure_home')
    .down()
    .box(blocks.bedrock, 7, 1, 6) // bedrock floor
    .up()
    .box(blocks.air, 7, 5, 6) // clear area first
    .up(2)
    .fwd()
    .right()
    .box(blocks.bedrock, 5, 1, 4) // bedrock ceiling
    .left()
    .back()
    .down(2)
    .box0( blocks.bedrock, 7, 2, 6)  // 4 walls
    .up(2)
    .prism0( blocks.stairs.cobblestone, 7, 6) // add a roof
    .down()
    .right(4)
    .back()
    .wallsign(['nothing','to see','here'])
    .fwd()
    .move('secure_home')
    .right(3)
    .fwd(4)
    .up()
    .hangtorch()     // place a torch on wall
    .move('secure_home')
    .right()
    .fwd(3)
    .bed()           // place a bed against left wall
    .fwd()
    .right(4)
    .box(blocks.furnace) // place a furnace against right wall
    .move('secure_home');
}

Drone.extend(secure_home);
