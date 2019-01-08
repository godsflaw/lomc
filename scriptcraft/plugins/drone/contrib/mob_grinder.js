'use strict';

var Drone = require('drone'),
    blocks = require('blocks');

/************************************************************************
### Drone.mob_grinder() method

Creates a simple but cosy dwelling.

#### Example

At the in-game prompt you can create a mob_grinder by looking at a block and typing:

```javascript
/js mob_grinder(levels)
```

Alternatively you can create a new Drone object from a Player or Location object and call the mob_grinder() method.

```javascript
var d = new Drone(player);
d.mob_grinder(levels);
```
***/
function mob_grinder(levels) {
  this
    .chkpt('mob_grinder')
    .box(blocks.chest, 2, 1, 1)
    .up()
    .box(blocks.hopper, 2, 1, 1)
    .down()
    .fwd()
    .left()
    .box(blocks.stone, 4, 1, 5)
    .up()
    .box(blocks.stone, 4, 1, 5)
    .up()
    .back()
    .box(blocks.glass, 1, 1, 6)
    .box(blocks.obsidian, 1, 1, 1)
    .turn(3)
    .wallsign([])
    .turn(1)
    .up()
    .back()
    .box(blocks.glass, 1, 1, 7)
    .box(blocks.obsidian, 1, 1, 3)
    .turn(3)
    .wallsign([])
    .turn(1)
    .fwd(2)
    .turn(3)
    .wallsign([])
    .turn(1)
    .back(2)
    .right(3)
    .box(blocks.glass, 1, 1, 7)
    .box(blocks.obsidian, 1, 1, 3)
    .turn(1)
    .wallsign([])
    .turn(3)
    .fwd(2)
    .turn(1)
    .wallsign([])
    .turn(3)
    .back(1)
    .down()
    .box(blocks.glass, 1, 1, 6)
    .box(blocks.obsidian, 1, 1, 1)
    .turn(1)
    .wallsign([])
    .turn(3)
    .up()
    .left(2)
    .box(blocks.lava, 2, 1, 1)
    .fwd(5)
    .down()
    .box(blocks.water, 2, 1, 1)
    .fwd()
    .down(2)
    .left()
    .box(blocks.stone, 4, 2, 1)
    .up(2)
    .box(blocks.glass, 4, 2, 1)
    .up(2)
    .back(3)
    .box0(blocks.glass, 4, 5, 4)
    .back(4)
    .box(blocks.glass, 4, 1, 4)
    .right(1)
    .fwd(5)
    .up(5)
    .mob_spawner(levels);
}

Drone.extend(mob_grinder);

/************************************************************************
### Drone.mob_spawner() method

Creates a simple but cosy dwelling.

#### Example

At the in-game prompt you can create a mob_spawner by looking at a block and typing:

```javascript
/js mob_spawner(levels)
```

Alternatively you can create a new Drone object from a Player or Location object and call the mob_spawner() method.

```javascript
var d = new Drone(player);
d.mob_spawner(levels);
```
***/
function mob_spawner(levels) {
  if (levels === undefined) {
    levels = 1;
  }

  for (var i = 0; i < levels; i++) {
    this
      .chkpt('mob_spawner')
      .back(9)
      .left(9)
      .chkpt('mob_spawner_start')
      .box(blocks.stone, 20, 1, 20)
      .fwd(9)
      .right(9)
      .box(blocks.air, 2, 1, 2)
      .move('mob_spawner_start')
      .up()
      .chkpt('mob_floor')
      .box0(blocks.stone, 20, 3, 20)
      .box(blocks.stone, 9, 1, 9)
      .fwd(11)
      .box(blocks.stone, 9, 1, 9)
      .back(11)
      .right(11)
      .box(blocks.stone, 9, 1, 9)
      .fwd(11)
      .box(blocks.stone, 9, 1, 9)
      .move('mob_floor')
      .right()
      .fwd(9)
      .box(blocks.water, 1, 1, 2)
      .move('mob_floor')
      .fwd()
      .right(9)
      .box(blocks.water, 2, 1, 1)
      .fwd(17)
      .box(blocks.water, 2, 1, 1)
      .move('mob_floor')
      .right(18)
      .fwd(9)
      .box(blocks.water, 1, 1, 2)
      .move('mob_spawner')
      .up(4);
  }

  this.move('mob_floor')
    .up(3)
    .box(blocks.stone, 20, 1, 20);
}

Drone.extend(mob_spawner);
