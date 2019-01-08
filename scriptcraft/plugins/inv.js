var inventory = require('inventory');
var items = require('items');

function inv(item, amount) {
  inventory(self).add(items[item](amount));
}

exports.inv = inv;

// /js inv('torch', 1);
