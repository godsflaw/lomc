var utils = require('utils');
var teleport = require('teleport');
var inventory = require('inventory');
var items = require('items');
var dust = require('dust');

//
// to set the location of the teleport:
// /jsp tp_shield set
//
// toggle the teleport shield function on and off for your player
// /jsp tp_shield on
// /jsp tp_shield off
//

var _store = { players: {} };

var tp_shield_location = plugin('tp_shield_location', {

  setTeleportLocation: function (player) {
    if (this.store.players[player.name] === undefined) {
      this.store.players[player.name] = {
        active: false,
        location: utils.locationToJSON(utils.getMousePos(player))
      }
    } else {
      this.store.players[player.name].location =
        utils.locationToJSON(utils.getMousePos(player));
    }

    player.sendMessage('set teleport shield location');
  },

  setTeleportLocationOn: function (player) {
    if (this.store.players[player.name] === undefined) {
      this.setTeleportLocation(player);
    }

    this.store.players[player.name].active = true;
    player.sendMessage('teleport shield active');
  },

  setTeleportLocationOff: function (player) {
    if (this.store.players[player.name] === undefined) {
      this.setTeleportLocation(player);
    } else {
      this.store.players[player.name].active = false;
    }

    player.sendMessage('teleport shield inactive');
  },

  store: _store
}, true);

command('tp_shield', function (params, sender) {
  var option = params[0];

  if (option === 'set'){
    tp_shield_location.setTeleportLocation(sender);
  } else if (option === 'on'){
    tp_shield_location.setTeleportLocationOn(sender);
  } else if (option === 'off'){
    tp_shield_location.setTeleportLocationOff(sender);
  } else {
    sender.sendMessage(option + ' is not a valid option (set|on|off)');
  }
});

function has_cobblestone(player) {
  for (i = 2; i < 65; i++) {
    if (inventory(player).contains( items.cobblestone(i) )) {
      return true;
    }
  }

  return false;
}

function has_shield(player) {
  if (player.getEquipment().getItemInMainHand().getType() === items.shield() ||
      player.getEquipment().getItemInOffHand().getType() === items.shield()) {
    return true;
  }

  return false;
}

function cast_teleport(damager, damagee) {
  if (has_shield(damagee) && dust.burn(damagee, 'TP_SHIELD')) {
    // inventory(damagee)
    //   .remove( items.cobblestone(2) );
    damager.teleport(utils.locationFromJSON(
      tp_shield_location.store.players[damagee.name].location
    ));
    damagee.sendMessage('teleported ' + damager);
  }
}

function tp_shield(event, cancel) {
  var damagee;
  var damager;
  var damageeType;
  var damagerType;

  try {
    damagee = event.getEntity();
    damageeType = damagee.getType().toString();
    damager = event.getDamager();
    damagerType = damager.getType().toString();
  } catch(err) {
    return;
  }

  // we don't teleport other players
  if (damageeType === 'PLAYER' && damagerType !== 'PLAYER') {
    if (damagerType === 'ARROW' ||
        damagerType === 'LLAMA_SPIT' ||
        damagerType === 'SPLASH_POTION') {
      damager = damager.getShooter();
    }

    if (tp_shield_location.store.players[damagee.name] &&
        tp_shield_location.store.players[damagee.name].active &&
        tp_shield_location.store.players[damagee.name].location) {
	    cast_teleport(damager, damagee);
    }
  }
}

events.entityDamageByEntity( tp_shield );

function tp_add_player(event, cancel) {
  var player = event.getPlayer();
  tp_shield_location.setTeleportLocationOff(player);
}

events.playerJoin( tp_add_player );

exports.tp_shield_location = tp_shield_location;
