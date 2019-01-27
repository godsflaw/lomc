'use strict';

var Drone = require('drone'),
    dust = require('dust'),
    items = require('items'),
    blocks = require('blocks');

/************************************************************************
### Drone.garden_house() method

Creates a simple but cosy dwelling.

#### Example

At the in-game prompt you can create a garden_house by looking at a block and
typing:

```javascript
/js garden_house()
```

Alternatively you can create a new Drone object from a Player or Location
object and call the garden_house() method.

```javascript
var d = new Drone(player);
d.garden_house(wood_type);
```
***/

blocks.acacia_leaves = 161;
blocks.acacia_wood = 162;

var PLAYER_TRAPDOOR_FACING = [ 6, 4, 7, 5 ];

command('garden_house', function(params, sender) {
  var wood_type = params[0];

  if (dust.burn(sender, 'GARDEN_HOUSE')) {
    var d = new Drone(sender);
    d.garden_house(wood_type);
  }
});

function garden_house(wood_type) {
  var wood = _get_wood(wood_type);

  this.gh_delete()
    .fwd(12);

  for (var i = 0; i < 4; i++) {
    this.chkpt('gh_quarter_start_' + i)
      .gh_inner_circle(wood)
      .chkpt('gh_quarter_end')
      .move('gh_quarter_start_' + i)
      .gh_garden_circle(wood, i)
      .move('gh_quarter_start_' + i)
      .gh_outer_circle(wood)
      .move('gh_quarter_start_' + i)
      .gh_walkway(wood)
      .move('gh_quarter_start_' + i)
      .gh_fill_inner_circle(wood, i)
      .move('gh_quarter_start_' + i)
      .gh_second_floor_beams(wood)
      .move('gh_quarter_start_' + i)
      .gh_second_floor(wood)
      .move('gh_quarter_start_' + i)
      .gh_roof(wood)
      .move('gh_quarter_start_' + i)
      .gh_tower(wood)
      .move('gh_quarter_start_' + i)
      .gh_gable_end(wood)
      .move('gh_quarter_end')
      .turn(3);
  }

  this.gh_walkway(wood);

  for (var i = 0; i < 4; i++) {
    this.move('gh_quarter_start_' + i)
      .gh_water_the_garden(wood);
  }
}

function gh_delete() {
  this.chkpt('gh_delete_start')
    .back(5)
    .left(25)
    .box(blocks.air, 50, 50, 50)
    .down()
    .box(blocks.grass, 50, 1, 50)
    .chkpt('gh_delete_end')
    .move('gh_delete_start');
}

function gh_inner_circle(wood) {
  this.chkpt('gh_inner_circle_start')
    .box(blocks[wood.frame], 3, 1, 1)
    .right(3)
    .fwd()
    .box(blocks[wood.frame], 2, 1, 1)
    .right()
    .gh_ground_beams(wood, 'left')
    .right()
    .fwd()
    .box(blocks[wood.frame], 1, 1, 1)
    .right()
    .fwd()
    .box(blocks[wood.frame], 1, 1, 2)
    .turn(3)
    .gh_ground_beams(wood, 'right')
    .turn()
    .right()
    .fwd(2)
    .box(blocks[wood.frame], 1, 1, 2)
    .fwd(2)
    .chkpt('gh_inner_circle_end');
}

function gh_outer_circle(wood) {
  this.chkpt('gh_outer_circle_start')
    .back(11)
    .box(blocks[wood.frame], 3, 1, 1)
    .up()
    .box(blocks[wood.leaves], 3, 1, 1)
    .down()
    .right(3)
    .fwd()
    .box(blocks[wood.frame], 1, 1, 1)
    .up()
    .box(blocks[wood.leaves], 1, 1, 1)
    .down()
    .right(2)
    .fwd()
    .box(blocks[wood.frame], 3, 1, 1)
    .up()
    .box(blocks[wood.leaves], 3, 1, 1)
    .down()
    .right(3)
    .fwd()
    .box(blocks[wood.frame], 2, 1, 1)
    .up()
    .box(blocks[wood.leaves], 2, 1, 1)
    .down()
    .right(2)
    .fwd()
    .box(blocks[wood.frame], 2, 1, 1)
    .up()
    .box(blocks[wood.leaves], 2, 1, 1)
    .down()
    .right(2)
    .fwd()
    .box(blocks[wood.frame], 1, 1, 1)
    .up()
    .box(blocks[wood.leaves], 1, 1, 1)
    .down()
    .right()
    .fwd()
    .box(blocks[wood.frame], 1, 1, 1)
    .up()
    .box(blocks[wood.leaves], 1, 1, 1)
    .down()
    .right()
    .fwd()
    .box(blocks[wood.frame], 1, 1, 2)
    .up()
    .box(blocks[wood.leaves], 1, 1, 2)
    .down()
    .right()
    .fwd(2)
    .box(blocks[wood.frame], 1, 1, 2)
    .up()
    .box(blocks[wood.leaves], 1, 1, 2)
    .down()
    .right()
    .fwd(2)
    .box(blocks[wood.frame], 1, 1, 3)
    .up()
    .box(blocks[wood.leaves], 1, 1, 3)
    .down()
    .right()
    .fwd(4)
    .box(blocks[wood.frame], 1, 1, 1)
    .up()
    .box(blocks[wood.leaves], 1, 1, 1)
    .down()
    .right()
    .fwd()
    .box(blocks[wood.frame], 1, 1, 2)
    .up()
    .box(blocks[wood.leaves], 1, 1, 2)
    .down()
    .fwd(2)
    .turn(3)
    .chkpt('gh_outer_circle_end');
}

function gh_walkway(wood) {
  this.chkpt('gh_walkway_start')
    .left()
    .back(10)
    .box(blocks.fence[wood.fence], 3, 1, 10)
    .up()
    .back()
    .box(blocks.pressure_plate_wood, 3, 1, 12)
    .down()
    .back()
    .left()
    .box(blocks[wood.frame], 5, 1, 1)
    .up()
    .box(blocks.torch)
    .down()
    .right()
    .box(blocks.stairs[wood.stairs], 3, 1, 1)
    .right(3)
    .up()
    .box(blocks.torch)
    .chkpt('gh_walkway_end');
}

function gh_second_floor(wood) {
  this.chkpt('gh_second_floor_start')
    .up(5)
    .fwd(2)
    .box(blocks[wood.block], 6, 1, 6)
    .fwd(2)
    .right(7)
    .box(blocks[wood.block], 9, 1, 4)
    .right(10)
    .box(blocks[wood.block], 1, 1, 3)
    .right()
    .turn(3)
    .box(blocks.slab.upper[wood.slab], 3, 1, 1)
    .turn()
    .left(11)
    .back(2)
    .box(blocks.stairs[wood.stairs], 12, 1, 1)
    .back(5)
    .left(2)
    .box(blocks[wood.block], 6, 1, 6)
    .gh_balcony_fence(wood)
    .back()
    .box(blocks.stairs[wood.stairs], 6, 1, 1)
    .back(7)
    .turn(3)
    .box(blocks.stairs[wood.stairs], 7, 1, 1)
    .turn()
    .fwd(7)
    .right(6)
    .turn(3)
    .box(blocks.stairs[wood.stairs], 6, 1, 1)
    .turn()
    .left(11)
    .back(4)
    .box(blocks[wood.block], 4, 1, 9)
    .back(2)
    .box(blocks[wood.block], 4, 1, 1)
    .back()
    .box(blocks.slab.upper[wood.slab], 4, 1, 1)
    .chkpt('gh_second_floor_end');
}

function gh_balcony_fence(wood) {
  this.chkpt('gh_balcony_fence_start')
    .up()
    .box(blocks.fence[wood.fence], 6, 1, 1)
    .right()
    .up(5)
    .box(blocks.slab[wood.roof], 5, 1, 5)
    .down(5)
    .right(4)
    .box(blocks.fence[wood.fence], 1, 1, 6)
    .box(blocks[wood.frame], 1, 1, 1)
    .up()
    .box(blocks.fence[wood.fence], 1, 4, 1)
    .down()
    .chkpt('gh_balcony_fence_1')
    .left(3)
    .box(blocks.air, 1, 1, 1)
    .back(2)
    .down(2);

  for (var i = 0; i < 4; i++) {
    this.box(blocks.stairs[wood.stairs], 1, 1, 1)
      .right()
      .box(blocks.dark_oak, 1, 1, 1)
      .left(2)
      .box(blocks.dark_oak, 1, 1, 1)
      .right()
      .back()
      .down();
  }

  this.box(blocks.stairs[wood.stairs], 1, 1, 1)
    .up()
    .box(blocks.air, 1, 1, 1)
    .move('gh_balcony_fence_1')
    .turn(3)
    .right(3)
    .box(blocks.air, 1, 1, 1)
    .back(2)
    .down(2);

  for (var i = 0; i < 4; i++) {
    this.box(blocks.stairs[wood.stairs], 1, 1, 1)
      .right()
      .box(blocks.dark_oak, 1, 1, 1)
      .left(2)
      .box(blocks.dark_oak, 1, 1, 1)
      .right()
      .back()
      .down();
  }

  this.box(blocks.stairs[wood.stairs], 1, 1, 1)
    .up()
    .box(blocks.air, 1, 1, 1)
    .turn()
    .move('gh_balcony_fence_start')
    .up()
    .left()
    .fwd()
    .box(blocks.dark_oak, 1, 5, 3)
    .fwd()
    .box(blocks.air, 1, 2, 1)
    .turn(3)
    .door()
    .turn()
    .back(7)
    .box(blocks.dark_oak, 1, 5, 5)
    .fwd()
    .up()
    .box(blocks[wood.block], 1, 2, 3)
    .down()
    .fwd()
    .up()
    .turn(3)
    .box(blocks.air, 1, 2, 1)
    .box(blocks.stained_glass_pane.black, 1, 2, 1)
    .back()
    .left(2)
    .down()
    .box(blocks.grass, 5, 1, 1)
    .back()
    .box(blocks.trapdoor + ':' + PLAYER_TRAPDOOR_FACING[this.dir], 5, 1, 1)
    .left()
    .fwd()
    .turn()
    .box(blocks.trapdoor + ':' + PLAYER_TRAPDOOR_FACING[this.dir], 1, 1, 1)
    .turn(3)
    .right()
    .up()
    .box(blocks.fence[wood.fence], 1, 3, 1)
    .right(4)
    .box(blocks.fence[wood.fence], 1, 3, 1)
    .right()
    .box(blocks.fence[wood.fence], 1, 2, 1)
    .left(4)
    .box(blocks.flower[_random_flower()])
    .right()
    .box(blocks.flower[_random_flower()])
    .right()
    .box(blocks.flower[_random_flower()])
    .left(3)
    .up(3)
    .box(blocks.slab[wood.slab], 5, 1, 1)
    .right(5)
    .down()
    .box(blocks.slab[wood.slab], 4, 1, 1)
    .right(4)
    .box(blocks[wood.block], 1, 2, 1)
    .back()
    .left()
    .box(blocks.slab[wood.slab], 2, 1, 1)
    .down(3)
    .right()
    .box(blocks.dark_oak, 1, 3, 1)
    .turn()
    .left()
    .box(blocks.stained_glass_pane.black, 1, 3, 1)
    .move('gh_balcony_fence_start')
    .up()
    .turn(3)
    .back(4)
    .right(6)
    .box(blocks.dark_oak, 1, 5, 3)
    .fwd()
    .box(blocks.air, 1, 2, 1)
    .turn()
    .door()
    .turn(3)
    .back(7)
    .box(blocks.dark_oak, 1, 5, 5)
    .fwd()
    .up()
    .box(blocks[wood.block], 1, 2, 3)
    .down()
    .fwd()
    .up()
    .turn()
    .box(blocks.air, 1, 2, 1)
    .box(blocks.stained_glass_pane.black, 1, 2, 1)
    .back()
    .left(2)
    .down()
    .box(blocks.grass, 5, 1, 1)
    .back()
    .box(blocks.trapdoor + ':' + PLAYER_TRAPDOOR_FACING[this.dir], 5, 1, 1)
    .right(5)
    .fwd()
    .turn(3)
    .box(blocks.trapdoor + ':' + PLAYER_TRAPDOOR_FACING[this.dir], 1, 1, 1)
    .turn()
    .left()
    .up()
    .box(blocks.fence[wood.fence], 1, 3, 1)
    .left(4)
    .box(blocks.fence[wood.fence], 1, 3, 1)
    .left()
    .box(blocks.fence[wood.fence], 1, 2, 1)
    .right(2)
    .box(blocks.flower[_random_flower()])
    .right()
    .box(blocks.flower[_random_flower()])
    .right()
    .box(blocks.flower[_random_flower()])
    .left(2)
    .left()
    .up(3)
    .box(blocks.slab[wood.slab], 5, 1, 1)
    .left(4)
    .down()
    .box(blocks.slab[wood.slab], 4, 1, 1)
    .left()
    .box(blocks[wood.block], 1, 2, 1)
    .back()
    .box(blocks.slab[wood.slab], 2, 1, 1)
    .down(3)
    .turn(3)
    .right()
    .box(blocks.stained_glass_pane.black, 1, 3, 1)
    .chkpt('gh_balcony_fence_end')
    .move('gh_balcony_fence_start');
}

function gh_water_the_garden(wood) {
  this.chkpt('gh_water_the_garden_start')
    .back(10)
    .right(2)
    .box(blocks.water, 1, 1, 10)
    .fwd()
    .right()
    .box(blocks.water, 1, 1, 10)
    .fwd()
    .right()
    .box(blocks.water, 1, 1, 9)
    .right()
    .box(blocks.water, 1, 1, 6)
    .right()
    .box(blocks.water, 1, 1, 5)
    .right()
    .box(blocks.water, 1, 1, 4)
    .right()
    .fwd()
    .box(blocks.water, 2, 1, 3)
    .right(2)
    .fwd()
    .box(blocks.water, 1, 1, 3)
    .right()
    .box(blocks.water, 1, 1, 4)
    .right()
    .fwd()
    .box(blocks.water, 1, 1, 11)
    .right()
    .fwd()
    .box(blocks.water, 1, 1, 10)
    .right()
    .fwd(2)
    .box(blocks.water, 1, 1, 8)
    .right()
    .fwd(2)
    .box(blocks.water, 1, 1, 6)
    .right()
    .fwd(4)
    .box(blocks.water, 1, 1, 2)
    .right()
    .fwd()
    .box(blocks.water, 1, 1, 1)
    .left(10)
    .back(2)
    .box(blocks.water, 5, 1, 2)
    .right()
    .fwd(2)
    .box(blocks.water, 10, 1, 1)
    .right(2)
    .back(3)
    .box(blocks.water, 2, 1, 1)
    .right()
    .back()
    .box(blocks.water, 1, 1, 1)
    .chkpt('gh_water_the_garden_end');
}

function gh_fill_inner_circle(wood, quarter) {
  var crop = 'potatoes';

  if (quarter === 0) {
    crop = 'potatoes';
  } else if (quarter === 1) {
    crop = 'beetroot';
  } else if (quarter === 2) {
    crop = 'carrots';
  } else if (quarter === 3) {
    crop = 'wheat_seeds';
  }

  this.chkpt('gh_fill_inner_circle_start')
    .fwd()
    .box(blocks.grass, 3, 1, 1)
    .fwd()
    .box(blocks.grass, 5, 1, 1)
    .fwd()
    .box(blocks.grass, 6, 1, 2)
    .fwd(2)
    .box(blocks.grass, 7, 1, 2)
    .box(blocks.water_still, 1, 1, 1)
    .fwd(2)
    .box(blocks.water_still, 1, 1, 1)
    .back()
    .box(blocks.dirt, 1, 1, 1)
    .up()
    .box(blocks.sugar_cane, 1, 3, 1)
    .down()
    .back(2)
    .box(blocks.dirt, 1, 1, 1)
    .up()
    .box(blocks.sugar_cane, 1, 3, 1)
    .down()
    .fwd()
    .left()
    .box(blocks.dirt, 1, 1, 1)
    .up()
    .box(blocks.sugar_cane, 1, 3, 1)
    .down()
    .right(2)
    .box(blocks.dirt, 1, 1, 1)
    .up()
    .box(blocks.sugar_cane, 1, 3, 1)
    .down()
    .fwd()
    .right()
    .box(blocks.dirt, 1, 1, 1)
    .up()
    .box(blocks.sugar_cane, 1, 3, 1)
    .down()
    .move('gh_fill_inner_circle_start')
    .fwd(3)
    .up()
    .box(blocks.trapdoor, 5, 1, 1)
    .right(4)
    .fwd()
    .box(blocks.trapdoor, 1, 1, 3)
    .down()
    .left()
    .box(blocks.farmland, 1, 1, 3)
    .up()
    .box(blocks[crop], 1, 1, 3)
    .down()
    .left()
    .box(blocks.farmland, 1, 1, 2)
    .up()
    .box(blocks[crop], 1, 1, 2)
    .down()
    .left()
    .box(blocks.farmland, 1, 1, 1)
    .up()
    .box(blocks[crop], 1, 1, 1)
    .down()
    .move('gh_fill_inner_circle_start')
    .fwd()
    .right(5)
    .box(blocks.water_still, 1, 1, 1)
    .up()
    .box(blocks.lily_pad, 1, 1, 1)
    .down()
    .fwd()
    .right()
    .box(blocks.water_still, 1, 1, 1)
    .up()
    .box(blocks.lily_pad, 1, 1, 1)
    .down()
    .chkpt('gh_fill_inner_circle_end');
}

function gh_garden_circle(wood, quarter) {
  var crop = 'potatoes';

  if (quarter === 0) {
    crop = 'potatoes';
  } else if (quarter === 1) {
    crop = 'beetroot';
  } else if (quarter === 2) {
    crop = 'carrots';
  } else if (quarter === 3) {
    crop = 'wheat_seeds';
  }

  this.chkpt('gh_garden_circle_start')
    .right(5)
    .back(2)
    .box(blocks.farmland, 7, 1, 3)
    .up()
    .right()
    .box(blocks[crop], 5, 1, 3)
    .left()
    .down()
    .fwd()
    .right(3)
    .box(blocks.water_still, 1, 1, 1)
    .left(3)
    .back()
    .box(blocks[wood.frame], 1, 1, 3)
    .back()
    .right()
    .box(blocks.farmland, 5, 1, 1)
    .up()
    .right()
    .box(blocks[crop], 3, 1, 1)
    .left()
    .down()
    .box(blocks[wood.frame], 1, 1, 1)
    .back()
    .right()
    .box(blocks[wood.frame], 3, 1, 1)
    .right(3)
    .fwd()
    .box(blocks[wood.frame], 1, 1, 1)
    .right()
    .fwd()
    .box(blocks[wood.frame], 1, 1, 3)
    .fwd(3)
    .left()
    .box(blocks[wood.frame], 1, 1, 1)
    .fwd()
    .left(3)
    .box(blocks[wood.frame], 3, 1, 1)
    .back()
    .left()
    .box(blocks[wood.frame], 1, 1, 1)
    .right()
    .box(blocks.farmland, 3, 1, 1)
    .up()
    .box(blocks[crop], 3, 1, 1)
    .down()
    .chkpt('gh_garden_circle_end')
    .move('gh_garden_circle_start');
}

function gh_ground_beams(wood, cross_beam_direction) {
  this.chkpt('gh_ground_beams_start')
    .box(blocks[wood.frame], 1, 6, 1)
    .fwd()
    .up(3)
    .turn(2)
    .hangtorch()
    .turn(2)
    .up(2)
    .back();

  if (cross_beam_direction === 'left') {
    this.left(4)
      .turn()
      .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 4)
      .turn(3);
  } else {
    this.right()
      .turn()
      .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 3)
      .turn(3);
  }

  this.move('gh_ground_beams_start')
    .back(10)
    .box(blocks[wood.frame], 1, 5, 1)
    .up(5)
    .chkpt('gh_ground_beams_1');

  if (cross_beam_direction === 'left') {
    this.left(4)
      .turn()
      .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 4)
      .turn(3);
  } else {
    this.right()
      .turn()
      .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 3)
      .turn(3);
  }

  this.move('gh_ground_beams_1')
    .back(2)
    .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 12)
    .down(5)
    .box(blocks.fence[wood.fence], 1, 5, 1)
    .up(5)
    .fwd(3)
    .down()
    .box(blocks.redstone_lamp_active, 1, 1, 9)
    .down(2)
    .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 9)
    .up()
    .box(items.redstoneTorchOn(), 1, 1, 9)
    .move('gh_ground_beams_start');
}

function gh_second_floor_beams(wood) {
  // beams to right
  this.chkpt('gh_second_floor_beams_start')
    .up(6)
    .chkpt('gh_second_floor_beams_1')
    .fwd()
    .right(4)
    .box(blocks[wood.frame], 1, 6, 1)
    .up(5)
    .left(8)
    .turn()
    .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 8)
    .turn(3)
    .right(8)
    .down(5)
    .back(4)
    .box(blocks[wood.frame], 1, 6, 1)
    .back(6)
    .box(blocks[wood.frame], 1, 6, 1)
    .up(5)
    .left(8)
    .turn()
    .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 8)
    .turn(3)
    .right(8)
    .fwd()
    .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 9);

  // beams to left
  this.move('gh_second_floor_beams_1')
    .fwd()
    .left(4)
    .box(blocks[wood.frame], 1, 6, 1)
    .back(4)
    .box(blocks[wood.frame], 1, 6, 1)
    .back(6)
    .box(blocks[wood.frame], 1, 6, 1)
    .up(5)
    .fwd()
    .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 9)
    .move('gh_second_floor_beams_start');
}

function gh_roof(wood) {
  this.chkpt('gh_roof_start')
    .back(12)
    .up(11)
    .right(5)
    .fwd(3)
    .turn(3)
    .chkpt('gh_roof_1');

  for (var i = 0; i < 5; i++) {
    this.box(blocks.stairs[wood.roof], 11, 1, 1)
      .up()
      .fwd();
  }

  this.box(blocks.slab[wood.roof], 11, 1, 1)
    .move('gh_roof_1')
    .left();

  for (var i = 0; i < 5; i++) {
    this.box(blocks.stairs[wood.stairs], 1, 1, 1)
      .up()
      .fwd();
  }

  this.box(blocks.slab[wood.stairs], 1, 1, 1)
    .move('gh_roof_start')
    .back(12)
    .up(11)
    .right(5)
    .fwd(14)
    .right()
    .chkpt('gh_roof_2');

  for (var i = 0; i < 5; i++) {
    this.box(blocks.stairs[wood.roof], 11, 1, 1)
      .up()
      .fwd();
  }

  this.move('gh_roof_2')
    .right(11);

  for (var i = 0; i < 5; i++) {
    this.box(blocks.stairs[wood.stairs], 1, 1, 1)
      .up()
      .fwd();
  }

  this.chkpt('gh_roof_end');
}

function gh_tower(wood) {
  this.chkpt('gh_tower_start')
    .up(9)
    .right(5)
    .fwd(2)
    .box(blocks[wood.frame], 1, 9, 1)
    .fwd()
    .box(blocks.fence[wood.fence], 1, 3, 1)
    .back()
    .left()
    .box(blocks.fence[wood.fence], 1, 3, 1)
    .right()
    .up(8)
    .left(5)
    .chkpt('gh_tower_1')
    .turn()
    .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 5)
    .turn(3)
    .down();

  for (var i = 0; i < 5; i++) {
   this.box(blocks[wood.block], 5 - i, 1, 1)
    .down()
    .right();
  }

  this.up(6)
    .fwd()
    .box(blocks[wood.frame] + ':' + _wood_horizontal(this.dir), 1, 1, 4)
    .turn(3)
    .chkpt('gh_tower_2')
    .down();

  for (var i = 0; i < 5; i++) {
   this.box(blocks[wood.block], 5 - i, 1, 1)
    .down();
  }

  this.move('gh_tower_1')
    .back();

  for (var i = 0; i < 5; i++) {
    this.box(blocks.stairs[wood.roof], 7 - i, 1, 1)
      .fwd()
      .up();
  }

  this.down()
    .box(blocks.glass, 2, 1, 1)
    .move('gh_tower_2')
    .left()
    .back();

  for (var i = 0; i < 5; i++) {
    this.box(blocks.stairs[wood.roof], 7 - i, 1, 1)
      .fwd()
      .right()
      .up();
  }

  this.down()
    .box(blocks.glass, 1, 1, 2)
    .chkpt('gh_tower_end');
}

function gh_gable_end(wood) {
  this.chkpt('gh_gable_end_start')
    .back(11)
    .up(6)
    .box(blocks.fence[wood.fence], 5, 1, 1)
    .right(4)
    .box(blocks.fence[wood.fence], 1, 1, 2)
    .left(4)
    .fwd(2)
    .up(6)
    .box(blocks[wood.frame], 1, 4, 1)
    .up(2)
    .right();

  for (var i = 0; i < 3; i++) {
    this.box(blocks.stained_glass_pane.black, 1 + i, 1, 1)
      .down();
  }

  this.move('gh_gable_end_start')
    .up(6)
    .fwd(3)
    .right(18)
    .turn(3)
    .box(blocks.fence[wood.fence], 4, 1, 1)
    .box(blocks.fence[wood.fence], 1, 1, 2)
    .right(3)
    .fwd(2)
    .up(8);

  for (var i = 0; i < 3; i++) {
    this.box(blocks.stained_glass_pane.black, 1 + i, 1, 1)
      .down()
      .left();
  }

  this.chkpt('gh_gable_end_end');
}

var randInt = function(num) {
  return Math.floor(Math.random() * num);
};

function _random_wood() {
  var woods = {
    '0': 'oak',
    '1': 'acacia',
    '2': 'spruce',
    '3': 'birch',
    '4': 'jungle'
  };
  return woods[randInt(Object.keys(woods).length - 1)];
}

function _random_flower() {
  var flowers = Object.keys(blocks.flower);
  return flowers[randInt(flowers.length - 1)];
}

function _wood_horizontal(dir) {
  if (dir === 0 || dir === 2) {
    return 4;
  } else {
    return 8;
  }
}

function _get_wood(wood_type) {
  var wood;

  if (wood_type === 'oak') {
    wood = {
      'frame': 'wood',
      'block': 'oak',
      'slab': 'oak',
      'stairs': 'oak',
      'fence': 'oak',
      'gate': 'oak',
      'roof': 'birch',
      'leaves': 'leaves',
    };
  } else if (wood_type === 'acacia') {
    wood = {
      'frame': 'acacia_wood',
      'block': 'acacia',
      'slab': 'acacia',
      'stairs': 'acacia',
      'fence': 'acacia',
      'gate': 'acacia',
      'roof': 'birch',
      'leaves': 'acacia_leaves',
    };
  } else if (wood_type === 'birch') {
    wood = {
      'frame': 'birch_wood',
      'block': 'birch',
      'slab': 'birch',
      'stairs': 'birch',
      'fence': 'birch',
      'gate': 'birch',
      'roof': 'spruce',
      'leaves': 'birch_leaves',
    };
  } else if (wood_type === 'spruce') {
    wood = {
      'frame': 'spruce_wood',
      'block': 'spruce',
      'slab': 'spruce',
      'stairs': 'spruce',
      'fence': 'spruce',
      'gate': 'spruce',
      'roof': 'birch',
      'leaves': 'spruce_leaves',
    };
  } else if (wood_type === 'jungle') {
    wood = {
      'frame': 'jungle_wood',
      'block': 'jungle',
      'slab': 'jungle',
      'stairs': 'jungle',
      'fence': 'jungle',
      'gate': 'jungle',
      'roof': 'birch',
      'leaves': 'jungle_leaves',
    };
  } else {
    var base = _random_wood();
    var barrier = _random_wood();

    wood = {
      'frame': _random_wood() + '_wood',
      'block': base,
      'slab': base,
      'stairs': base,
      'fence': barrier,
      'gate': barrier,
      'roof': _random_wood(),
      'leaves': _random_wood() + '_leaves',
    };

    if (wood.frame === 'oak_wood') {
      wood.frame = 'wood';
    }

    if (wood.leaves === 'oak_leaves') {
      wood.leaves = 'leaves'
    }
  }

  return wood;
}

Drone.extend(garden_house);
Drone.extend(gh_ground_beams);
Drone.extend(gh_inner_circle);
Drone.extend(gh_outer_circle);
Drone.extend(gh_garden_circle);
Drone.extend(gh_walkway);
Drone.extend(gh_fill_inner_circle);
Drone.extend(gh_water_the_garden);
Drone.extend(gh_second_floor_beams);
Drone.extend(gh_second_floor);
Drone.extend(gh_balcony_fence);
Drone.extend(gh_roof);
Drone.extend(gh_tower);
Drone.extend(gh_gable_end);
Drone.extend(gh_delete);
