'use strict';

var Drone = require('drone'),
    items = require('items'),
    blocks = require('blocks');

/************************************************************************
### Drone.subway() method

Builds a powered 10 track segment in a direction, straight = 0, up = 1, down = -1.

#### Example

At the in-game prompt you can create a subway by looking at a block and typing:

```javascript
/js subway(segments, direction)
```

Alternatively you can create a new Drone object from a Player or Location object and call the subway() method.

```javascript
var d = new Drone(player);
d.subway(segments, direction);
```
***/
function subway(segments, direction) {
  if (segments === undefined) {
    segments = 1;
  }

  if (direction === undefined) {
    direction = 0;
  }

  for (var i = 0; i < segments; i++) {
    switch(direction) {
      case 1:
        subway_up(this);
        break;
      case -1:
        subway_down(this);
        break;
      default:
        subway_straight(this);
    }
  }
}

function subway_straight(subway) {
  subway
    .chkpt('subway')
    .left(2)
    .cylinder(blocks.air, 2, 10, { orientation: 'vertical' })
    .right(2)
    .down()
    .box(blocks.stone, 1, 1, 10)
    .up()
    .box(blocks.powered_rail, 1, 1, 1)
    .fwd()
    .box(blocks.rail, 1, 1, 9)
    .back()
    .right()
    .down()
    .box(blocks.stone, 1, 1, 1)
    .up()
    .box(blocks.torch, 1, 1, 1)
    .left(2)
    .down()
    .box(blocks.stone, 1, 1, 1)
    .up()
    .box(items.redstoneTorchOn(), 1, 1, 1)
    .move('subway')
    .fwd(10);
}

function subway_up(subway) {
  subway
    .chkpt('subway')
    .left(2)
    .cylinder(blocks.air, 2, 1, { orientation: 'vertical' })
    .right(2)
    .down()
    .box(blocks.stone, 1, 1, 1)
    .up()
    .box(blocks.powered_rail, 1, 1, 1)
    .right()
    .down()
    .box(blocks.stone, 1, 1, 1)
    .up()
    .box(blocks.torch, 1, 1, 1)
    .left(2)
    .down()
    .box(blocks.stone, 1, 1, 1)
    .up()
    .box(items.redstoneTorchOn(), 1, 1, 1)
    .move('subway')
    .up()
    .fwd();

  for (var i = 0; i < 3; i++) {
    subway
      .chkpt('subway')
      .left(2)
      .cylinder(blocks.air, 2, 1, { orientation: 'vertical' })
      .right(2)
      .down()
      .box(blocks.stone, 1, 1, 1)
      .up()
      .box(blocks.rail, 1, 1, 1)
      .move('subway')
      .up()
      .fwd();
  }
}

function subway_down(subway) {
  subway
    .chkpt('subway')
    .left(2)
    .cylinder(blocks.air, 2, 1, { orientation: 'vertical' })
    .right(2)
    .down()
    .box(blocks.stone, 1, 1, 1)
    .up()
    .box(blocks.powered_rail, 1, 1, 1)
    .right()
    .down()
    .box(blocks.stone, 1, 1, 1)
    .up()
    .box(blocks.torch, 1, 1, 1)
    .left(2)
    .down()
    .box(blocks.stone, 1, 1, 1)
    .up()
    .box(items.redstoneTorchOn(), 1, 1, 1)
    .move('subway')
    .down()
    .fwd();

  for (var i = 0; i < 3; i++) {
    subway
      .chkpt('subway')
      .left(2)
      .cylinder(blocks.air, 2, 1, { orientation: 'vertical' })
      .right(2)
      .down()
      .box(blocks.stone, 1, 1, 1)
      .up()
      .box(blocks.rail, 1, 1, 1)
      .move('subway')
      .down()
      .fwd();
  }
}

Drone.extend(subway);
