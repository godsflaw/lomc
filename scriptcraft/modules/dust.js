'use strict';

var Drone = require('drone');
var blocks = require('blocks');
var fireworks = require('fireworks');

var _store = { players: {} };

var _SPELLS = {
  'GARDEN_HOUSE': 1000000000,   //   10,000,000.00 DUST
  'EXCAVATE':         146667,   //        1,466.67 DUST
  'SURVEY':             3616,   //           36.16 DUST
  'TP_SHIELD':         10000,   //          100.00 DUST
};

var CURRENCY_CODE = 'DUST';
var DECIMAL_DIGITS = 2;

// Total ore on server 209,910,713,595,060

// (14062485000004 chunks) * (0.2 generation rate) = 2,812,497,000,001 (1%) -> (55%)
var EMERALD_REWARD = 19555576; // 195,555.76

// (14062485000004 chunks) * (3.097 generation rate) = 43,551,516,045,012 (21%) -> (23%)
var DIAMOND_REWARD = 482188;   //   4,821.88

// (14062485000004 chunks) * (3.43 generation rate) = 48,234,323,550,014 (23%) -> (21%)
var LAPIS_REWARD = 435375;     //   4,353.75

// (14062485000004 chunks) * (8.2 generation rate) = 115,312,377,000,033 (55%) -> (1%)
var GOLD_REWARD = 8672;        //      86.72

var randInt = function(num) {
  return Math.floor(Math.random() * num);
};

var dust = plugin('dust', {

  reward: function(block) {
    var reward = 0;

    switch(block.getType().toString()) {
      case 'EMERALD_ORE':
        reward = EMERALD_REWARD;
        break;
      case 'LAPIS_ORE':
        reward = LAPIS_REWARD;
        break;
      case 'DIAMOND_ORE':
        reward = DIAMOND_REWARD;
        break;
      case 'GOLD_ORE':
        reward = GOLD_REWARD;
        break;
      default:
        // no reward
        // console.log(block.getType().toString());
        reward = 0;
    }

    return reward;
  },

  found: function(player, block) {
    var reward = this.reward(block);

    if (reward > 0) {
      this.store.players[player.name].balance += reward;
      player.sendMessage(
        'you get ' + this.prettyPrint(reward) + ' ' + CURRENCY_CODE +
        ', for a total of ' +
        this.prettyPrint(this.store.players[player.name].balance) +
        ' ' + CURRENCY_CODE
      );
    }
  },

  printBalance: function(player) {
    player.sendMessage(
      'your balance is: ' +
      this.prettyPrint(this.store.players[player.name].balance) +
      ' ' + CURRENCY_CODE
    );
  },

  canCast: function(player, _spell, _times) {
    var times = (_times === undefined) ? 1 : _times;
    var cost = _SPELLS[_spell];

    if (cost === undefined) {
      return false;
    }

    if (this.store.players[player.name].balance >= (cost * times)) {
      return true;
    } else {
      return false;
    }
  },

  burn: function(player, _spell, _times) {
    var times = (_times === undefined) ? 1 : _times;
    var cost = _SPELLS[_spell];

    if (!this.canCast(player, _spell, times)) {
      echo('You need more dust to cast this spell.');
      return false;
    }

    this.store.players[player.name].balance =
      this.store.players[player.name].balance - (cost * times);

    var fx = ((times * cost)/_SPELLS['TP_SHIELD'] < 20) ?
      (times * cost)/_SPELLS['TP_SHIELD'] : 20;
    for (var i = 0; i < fx; i++) {
      setTimeout(function() {
        fireworks.firework(player.location);
      }, randInt(2000));
    }

    return true;
  },

  prettyPrint: function(amount) {
    return (amount / Math.pow(10, DECIMAL_DIGITS)).toFixed(DECIMAL_DIGITS);
  },

  store: _store
}, true);

function blockBreak(event, cancel) {
  var player = event.getPlayer();
  var block = event.getBlock();

  if (_store.players[player.name] === undefined) {
    _store.players[player.name] = {
      balance: 0
    };
  }

  dust.found(player, block);
}

function isOre( block ) {

  if (__plugin.bukkit){
    var bkMaterial = org.bukkit.Material;
    if (block.type.equals(bkMaterial.LAPIS_ORE) ||
        block.type.equals(bkMaterial.COAL_ORE) ||
        block.type.equals(bkMaterial.IRON_ORE) ||
        block.type.equals(bkMaterial.REDSTONE_ORE) ||
        block.type.equals(bkMaterial.GLOWING_REDSTONE_ORE) ||
        block.type.equals(bkMaterial.EMERALD_ORE) ||
        block.type.equals(bkMaterial.DIAMOND_ORE) ||
        block.type.equals(bkMaterial.QUARTZ_ORE) ||
        block.type.equals(bkMaterial.GOLD_ORE) ) {
      return true;
    }
  }

  if (__plugin.canary){
    if (block.typeId == blocks.lapis_lazuli_ore ||
        block.typeId == blocks.coal_ore ||
        block.typeId == blocks.iron_ore ||
        block.typeId == blocks.redstone_ore ||
        block.typeId == blocks.redstone_ore_glowing ||
        block.typeId == blocks.emerald_ore ||
        block.typeId == blocks.diamond_ore ||
        block.typeId == blocks.quartzore ||
        block.typeId == blocks.netherquartzore ||
        block.typeId == blocks.gold_ore ) {
      return true;
    }
  }

  return false;
}

function isBedrock( block ) {

  if (__plugin.bukkit){
    var bkMaterial = org.bukkit.Material;
    if ( block.type.equals(bkMaterial.BEDROCK) ) {
      return true;
    }
  }

  if (__plugin.canary){
    if (block.typeId == blocks.bedrock ) {
      return true;
    }
  }

  return false;
}

Drone.extend(function survey(player, square) {
  var total = 0;

  if (square === undefined) {
    square = 1;
  } else if(square > 20) {
    square = 20;
  }

  if (!dust.burn(player, 'SURVEY', square * square)) {
    return;
  }

  for (var i = 0; i < square; i++) {
    this.chkpt('top_i');

    for (var j = 0; j < square; j++) {
      this.chkpt('top_j');

      var block = this.getBlock();
      while (!isBedrock(block)) {
        if (isOre(block)) {
          total += dust.reward(block);
        }

        this.down();
        block = this.getBlock();
      }

      this.move('top_j');
      this.right();
    }

    this.move('top_i');
    this.fwd();
  }

  var excavationCost = _SPELLS['EXCAVATE'] * (square * square);

  player.sendMessage(
    'contains: ' + dust.prettyPrint(total) + ' ' + CURRENCY_CODE
  );
  player.sendMessage(
    'excavation cost: ' + dust.prettyPrint(excavationCost) + ' ' + CURRENCY_CODE
  );
  player.sendMessage(
    'profit: ' + dust.prettyPrint(total - excavationCost) + ' ' + CURRENCY_CODE
  );
});

Drone.extend(function excavate(player, square) {
  if (square === undefined) {
    square = 1;
  } else if(square > 20) {
    square = 20;
  }

  if (!dust.burn(player, 'EXCAVATE', square * square)) {
    return;
  }

  for (var i = 0; i < square; i++) {
    this.chkpt('top_i');

    for (var j = 0; j < square; j++) {
      this.chkpt('top_j');

      var block = this.getBlock();
      while (!isBedrock(block)) {
        if (!isOre(block)) {
          this.box(blocks.air, 1, 1, 1);
        }

        this.down();
        block = this.getBlock();
      }

      this.move('top_j');
      this.right();
    }

    this.move('top_i');
    this.fwd();
  }
});

command('dust', function(params, sender) {
  var option = params[0];
  var square = params[1] || 1;

  if (option === 'balance') {
    dust.printBalance(sender);
  } else if (option === 'survey') {
    var drone = new Drone(sender);
    drone.survey(sender, square);
  } else if (option === 'excavate') {
    var drone = new Drone(sender);
    drone.excavate(sender, square);
  } else {
    sender.sendMessage(option + ' is not a valid option (balance|survey|excavate)');
    sender.sendMessage('balance: print your DUST balance');
    sender.sendMessage('survey <square>: how much DUST is in this square area');
    sender.sendMessage('excavate <square>: remove all non-ore blocks down to bedrock');
  }
});

events.blockBreak( blockBreak );

module.exports = dust;
