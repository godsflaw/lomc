'use strict';

var Drone = require('drone');
var blocks = require('blocks');

var _store = { players: {} };

var CURRENCY_CODE = 'DUST';
var DECIMAL_DIGITS = 15;
var TOTAL_SUPPLY = 100000;

// Total ore on server 209,910,713,595,060

// (14062485000004 chunks) * (0.2 generation rate) = 2,812,497,000,001 (1%) -> (55%)
var EMERALD_REWARD = 19555576; // 0.000000019555576

// (14062485000004 chunks) * (3.097 generation rate) = 43,551,516,045,012 (21%) -> (23%)
var DIAMOND_REWARD = 482188;   // 0.000000000482188

// (14062485000004 chunks) * (3.43 generation rate) = 48,234,323,550,014 (23%) -> (21%)
var LAPIS_REWARD = 435375;     // 0.000000000435375

// (14062485000004 chunks) * (8.2 generation rate) = 115,312,377,000,033 (55%) -> (1%)
var GOLD_REWARD = 8672;        // 0.000000000008672

var dust = plugin('dust', {

  reward: function (block) {
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

  found: function (player, block) {
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

  balance: function () {
    echo(
      'your balance is: ' +
      this.prettyPrint(this.store.players[self.name].balance) +
      ' ' + CURRENCY_CODE
    );
  },

  prettyPrint: function (amount) {
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
    if ( block.type.equals(bkMaterial.LAPIS_ORE) ||
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

function survey(square) {
  var total = 0;

  if (square === undefined) {
    square = 1;
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

  echo('contains ' + dust.prettyPrint(total) + ' ' + CURRENCY_CODE);
}

function excavate(square) {
  if (square === undefined) {
    square = 1;
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
}

Drone.extend(excavate);
Drone.extend(survey);

events.blockBreak( blockBreak );

exports.dust = dust;
